import { IGymRepository } from "../../../domain/repositories/IGymRepository";
import { GymProfileDTO } from "../../dtos/gym-profile/GymProfileDTO";
import { IUpdateGymProfileUseCase } from "../../IUseCases/gym-profile/IUpdateGymProfileUseCase";
import { GymProfileMapper } from "../../mapper/GymProfileMapper";
import { Gym } from "../../../domain/entities/Gym";
import { NotFoundError } from "../../errors/AppError";

export class UpdateGymProfileUseCase implements IUpdateGymProfileUseCase {
    constructor(
        private _gymRepository: IGymRepository
    ) { }
    async execute(id: string, gymData: GymProfileDTO): Promise<GymProfileDTO> {
        const gym = await this._gymRepository.findById(id);
        if (!gym) throw new NotFoundError("Gym not found");

        const updatedGym = new Gym(
            gym.id,
            gym.email,
            gym.password,
            gym.role,
            gymData.logoUrl || gym.logoUrl,
            gymData.gymName || gym.gymName,
            gymData.caption || gym.caption,
            gymData.phoneNumber || gym.phoneNumber,
            gymData.address || gym.address,
            gymData.description || gym.description,
            gymData.location || gym.location,
            gym.approvalStatus,
            gym.subscriptionStatus,
            gym.expiryDate,
            gym.certificates,
            gym.createdAt
        );

        const result = await this._gymRepository.update(updatedGym);
        return GymProfileMapper.toDTO(result);
    }
}