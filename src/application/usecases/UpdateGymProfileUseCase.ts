import { IGymRepository } from "../../domain/repositories/IGymRepository";
import { GymProfileDTO } from "../dtos/gym-profile/GymProfileDTO";
import { IUpdateGymProfileUseCase } from "../IUseCases/gym-profile/IUpdateGymProfileUseCase";
import { GymProfileMapper } from "../mapper/GymProfileMapper";

export class UpdateGymProfileUseCase implements IUpdateGymProfileUseCase {
    constructor(
        private _gymRepository: IGymRepository
    ) { }
    async execute(id: string, gymData: GymProfileDTO): Promise<GymProfileDTO> {
        const updatedGym = await this._gymRepository.update(id, gymData)
        return GymProfileMapper.toDTO(updatedGym);
    }
}