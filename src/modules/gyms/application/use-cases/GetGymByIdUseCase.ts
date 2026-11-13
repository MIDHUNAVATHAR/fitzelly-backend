import { IGetGymByIdUseCase } from "../interfaces/IGetGymByIdUseCase";
import { IGymRepository } from "../../domain/repositories/IGymRepository";
import { GymMapper } from "../dtos/SuperAdminGymMapper";
import { GymResponseDTO } from "../dtos/GetAllGymsDTO";
import { NotFoundError } from "../../../../shared/errors/AppError";

import { ISubscriptionRepository } from "../../../subscriptions/domain/repositories/ISubscriptionRepository";

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


