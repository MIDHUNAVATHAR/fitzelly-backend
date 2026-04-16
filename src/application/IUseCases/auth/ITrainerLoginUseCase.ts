import { TrainerLoginRequestDTO, TrainerLoginResponseDTO } from "../../dtos/auth/TrainerLoginDTO";

export interface ITrainerLoginUseCase {
    execute(data: TrainerLoginRequestDTO): Promise<TrainerLoginResponseDTO>
}