import { IGymRepository } from "../../domain/repositories/IGymRepository";
import { GymProfileDTO } from "../dtos/GymProfileDTO";
import { IUpdateGymProfileUseCase } from "../IUseCases/IUpdateGymProfileUseCase";
import { GymProfileMapper } from "../mappers/GymProfileMapper";

export class UpdateGymProfileUseCase implements IUpdateGymProfileUseCase {
    constructor(
        private _gymRepository: IGymRepository
    ) { }
    async execute(id: string, gymData: GymProfileDTO): Promise<GymProfileDTO> {
        const updatedGymDoc = await this._gymRepository.update(id, gymData)
        return GymProfileMapper.toDTO(updatedGymDoc);
    }
}