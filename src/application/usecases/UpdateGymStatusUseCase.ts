import { GymUpdateRequestDTO, GymResponseDTO } from "../dtos/GetAllGymsDTO";
import { IUpdateGymStatusUseCase } from "../IUseCases/IUpdateGymStatusUseCase";
import { IGymRepository } from "../../domain/repositories/IGymRepository";
import { GymMapper } from "../mapper/SuperAdminGymMapper";

export class UpdateGymStatusUseCase implements IUpdateGymStatusUseCase {
    constructor(
        private _gymRepository: IGymRepository
    ) { }

    async execute(gymId: string, updateData: GymUpdateRequestDTO): Promise<GymResponseDTO> {
        
        const updatedData = await this._gymRepository.updateStatus(gymId, updateData);
        return GymMapper.toResponseDTO(updatedData);
    }
}