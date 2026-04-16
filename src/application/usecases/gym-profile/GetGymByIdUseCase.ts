import { IGetGymByIdUseCase } from "../../IUseCases/gym-profile/IGetGymByIdUseCase";
import { IGymRepository } from "../../../domain/repositories/IGymRepository";
import { GymMapper } from "../../mapper/SuperAdminGymMapper";
import { GymResponseDTO } from "../../dtos/superAd-gym-listing/GetAllGymsDTO";
import { NotFoundError } from "../../errors/AppError";

import { ISubscriptionRepository } from "../../../domain/repositories/ISubscriptionRepository";

export class GetGymByIdUseCase implements IGetGymByIdUseCase {
    constructor(
        private readonly _gymRepository: IGymRepository,
        private readonly _subscriptionRepository: ISubscriptionRepository
    ) { }

    async execute(gymId: string): Promise<GymResponseDTO> {
        const gym = await this._gymRepository.findById(gymId);
        if (!gym) {
            throw new NotFoundError("Gym");
        }
        const latestSubscription = await this._subscriptionRepository.findLatestSubscriptionByGymId(gymId);
        return GymMapper.toResponseDTO(gym, latestSubscription);
    }
}


