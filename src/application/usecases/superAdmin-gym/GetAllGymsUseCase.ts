import { IGetAllGymsUseCase } from "../../IUseCases/superAd-gym-listing/IGetAllGymsUseCase";
import { IGymRepository } from "../../../domain/repositories/IGymRepository";
import { GymMapper } from "../../mapper/SuperAdminGymMapper";
import { GymsListResponseDTO } from "../../dtos/superAd-gym-listing/GetAllGymsDTO";
import { ISubscriptionRepository } from "../../../domain/repositories/ISubscriptionRepository";



interface SearchQuery {
    gymName?: { $regex: string; $options: string };
    approvalStatus?: string;
}

export class GetAllGymsUseCase implements IGetAllGymsUseCase {
    constructor(
        private _gymRepository: IGymRepository,
        private _subscriptionRepository: ISubscriptionRepository
    ) { }

    async execute(page: number, limit: number, search: string, status?: string): Promise<GymsListResponseDTO> {
        const skip = (page - 1) * limit;

        /**
         * build search query
         */
        const searchQuery: SearchQuery = {};
        if (search) {
            searchQuery.gymName = { $regex: search, $options: "i" };
        }

        if (status && status !== 'all') {
            searchQuery.approvalStatus = status;
        }

        /**
         * total gyms count for pagination
         */
        const totalGyms = await this._gymRepository.count(searchQuery);

        const gyms = await this._gymRepository.findAll(searchQuery, {
            skip,
            limit,
            sort: { createdAt: -1 }
        })

        /**
         * fetch latest subscription for each gym
         */
        const gymsWithSubscriptions = await Promise.all(gyms.map(async (gym) => {
            const latestSubscription = await this._subscriptionRepository.findLatestSubscriptionByGymId(gym.id);
            return { gym, latestSubscription };
        }));

        const gymDTOs = gymsWithSubscriptions.map(({ gym, latestSubscription }) =>
            GymMapper.toResponseDTO(gym, latestSubscription)
        );

        return {
            gyms: gymDTOs,
            totalPages: Math.ceil(totalGyms / limit),
            currentPage: page,
            totalGyms
        }
    }
}