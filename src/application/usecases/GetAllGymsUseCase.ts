import { IGetAllGymsUseCase } from "../IUseCases/superAd-gym-listing/IGetAllGymsUseCase";
import { IGymRepository } from "../../domain/repositories/IGymRepository";
import { GymMapper } from "../mapper/SuperAdminGymMapper";
import { GymsListResponseDTO } from "../dtos/superAd-gym-listing/GetAllGymsDTO";

interface SearchQuery {
    gymName?: { $regex: string; $options: string };
}

export class GetAllGymsUseCase implements IGetAllGymsUseCase {
    constructor(
        private _gymRepository: IGymRepository
    ) { }

    async execute(page: number, limit: number, search: string): Promise<GymsListResponseDTO> {
        const skip = (page - 1) * limit;

        //build search query based on gym name
        const searchQuery: SearchQuery = {};
        if (search) {
            searchQuery.gymName = { $regex: search, $options: "i" };
        }

        //total gyms count for pagination
        const totalGyms = await this._gymRepository.count(searchQuery);

        const gyms = await this._gymRepository.findAll(searchQuery, {
            skip,
            limit,
            sort: { createdAt: -1 }
        })

        const gymDTOs = GymMapper.toResponseDTOList(gyms);

        return {
            gyms: gymDTOs,
            totalPages: Math.ceil(totalGyms / limit),
            currentPage: page,
            totalGyms
        }
    }
}