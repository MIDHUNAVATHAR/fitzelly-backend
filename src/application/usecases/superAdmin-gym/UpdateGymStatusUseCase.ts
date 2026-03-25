import { GymUpdateRequestDTO, GymResponseDTO } from "../../dtos/superAd-gym-listing/GetAllGymsDTO";
import { IUpdateGymStatusUseCase } from "../../IUseCases/superAd-gym-listing/IUpdateGymStatusUseCase";
import { IGymRepository } from "../../../domain/repositories/IGymRepository";
import { GymMapper } from "../../mapper/SuperAdminGymMapper";

export class UpdateGymStatusUseCase implements IUpdateGymStatusUseCase {
    constructor(
        private _gymRepository: IGymRepository
    ) { }

    async execute(gymId: string): Promise<GymResponseDTO> {

        const updatedData = await this._gymRepository.updateStatus(gymId, updateData);
        return GymMapper.toResponseDTO(updatedData);
    }
}