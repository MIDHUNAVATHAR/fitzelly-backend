import { GymProfileDTO } from "../dtos/GymProfileDTO";
import { IGetGymProfileUseCase } from "../interfaces/IGetGymProfileUseCase";
import { IGymRepository } from "../../domain/repositories/IGymRepository";
import { ISubscriptionRepository } from "../../../subscriptions/domain/repositories/ISubscriptionRepository";
import { GymProfileMapper } from "../dtos/GymProfileMapper";
import { NotFoundError } from "../../../../shared/errors/AppError";


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
                startDate: latestSubscription.startDate,
                expiryDate: latestSubscription.endDate,
                paymentMethod: latestSubscription.paymentGateway || "N/A",
                planName: latestSubscription.planName,
                amount: latestSubscription.amount
            };
        }

        return GymProfileMapper.toDTO(gym);
    }
}
