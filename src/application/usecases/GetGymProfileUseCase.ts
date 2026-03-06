import { GymProfileDTO } from "../dtos/gym-profile/GymProfileDTO";
import { IGetGymProfileUseCase } from "../IUseCases/gym-profile/IGetGymProfileUseCase";
import { IGymRepository } from "../../domain/repositories/IGymRepository";
import { ISubscriptionRepository } from "../../domain/repositories/ISubscriptionRepository";
import { GymProfileMapper } from "../mapper/GymProfileMapper";
import { NotFoundError } from "../errors/AppError";


export class GetGymProfileUseCase implements IGetGymProfileUseCase {

    constructor(
        private _gymRepository: IGymRepository,
        private _subscriptionRepository: ISubscriptionRepository
    ) { }

    async execute(id: string): Promise<GymProfileDTO> {
        const gym = await this._gymRepository.findById(id);
        if (!gym) {
            throw new NotFoundError("Gym")
        }

        const latestSubscription = await this._subscriptionRepository.findLatestSubscriptionByGymId(id);

        if (latestSubscription) {
            let status = latestSubscription.status;
            if (new Date() > latestSubscription.endDate) {
                status = "expired";
            }

            const dto = GymProfileMapper.toDTO(gym);
            return {
                ...dto,
                subscriptionStatus: status.charAt(0).toUpperCase() + status.slice(1),
                expiryDate: latestSubscription.endDate
            };
        }

        return GymProfileMapper.toDTO(gym);
    }
}
