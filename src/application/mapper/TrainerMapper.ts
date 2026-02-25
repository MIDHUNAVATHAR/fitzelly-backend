import { TrainerRequestDTO, TrainerResponseDTO, UpdateTrainerRequestDTO } from "../dtos/TrainerDTO";
import { Trainer } from "../../domain/entities/Trainer";

export class TrainerMapper {
    static toEntity(trainerData: TrainerRequestDTO): Trainer {
        return new Trainer(
            "",
            trainerData.gymId,
            trainerData.email,
            "",
            "",
            trainerData.fullName,
            trainerData.phoneNumber,
            trainerData.dateOfBirth ? new Date(trainerData.dateOfBirth) : null,
            trainerData.salary ?? "",
            trainerData.specialization ?? ""
        )
    }

    static updateEntity(
        existing: Trainer,
        data: UpdateTrainerRequestDTO
    ): Trainer {
        return new Trainer(
            existing.id,
            existing.gymId,
            data.email && !existing.isEmailVerified ? data.email : existing.email,
            existing.password,
            existing.profileUrl,
            data.fullName ?? existing.fullName,
            data.phoneNumber ?? existing.phoneNumber,
            data.dateOfBirth ? new Date(data.dateOfBirth) : existing.dateOfBirth,
            data.salary ?? existing.salary,
            data.specialization ?? existing.specialization,
            existing.isEmailVerified,
            existing.joinedDate,
            existing.isDeleted
        );
    }

    static toTrainerResponseDTO(trainer: Trainer): TrainerResponseDTO {
        return {
            id: trainer.id,
            fullName: trainer.fullName,
            email: trainer.email,
            phoneNumber: trainer.phoneNumber,
            specialization: trainer.specialization,
            salary: trainer.salary ?? "",
            dateOfBirth: trainer.dateOfBirth?.toISOString() ?? "",
            joinedDate: trainer.joinedDate.toISOString(),
            isEmailVerified: trainer.isEmailVerified
        }
    }
}