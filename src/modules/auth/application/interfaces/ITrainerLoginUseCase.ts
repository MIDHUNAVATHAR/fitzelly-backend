import { TrainerLoginRequestDTO, TrainerLoginResponseDTO } from "../dtos/TrainerLoginDTO";

export interface ITrainerLoginUseCase {
    execute(data: TrainerLoginRequestDTO): Promise<TrainerLoginResponseDTO>
}