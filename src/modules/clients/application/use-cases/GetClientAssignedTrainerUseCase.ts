import { IClientRepository } from "../../domain/repositories/IClientRepository";
import { ITrainerRepository } from "../../../trainers/domain/repositories/ITrainerRepository";
import { TrainerResponseDTO } from "../../../trainers/application/dtos/TrainerDTO";
import { NotFoundError } from "../../../../shared/errors/AppError";
import { IGetClientAssignedTrainerUseCase } from "../interfaces/IGetClientAssignedTrainerUseCase";
import { TrainerMapper } from "../../../trainers/application/dtos/TrainerMapper";



export class GetClientAssignedTrainerUseCase implements IGetClientAssignedTrainerUseCase {
    constructor(
        private _clientRepository: IClientRepository,
        private _trainerRepository: ITrainerRepository
    ) { };

    async execute(clientId: string, trainerId: string): Promise<TrainerResponseDTO> {
        const client = await this._clientRepository.findById(clientId);
        if (!client) {
            throw new NotFoundError("Client");
        }

        const trainer = await this._trainerRepository.findById(trainerId);
        if (!trainer || trainer.isDeleted) {
            throw new NotFoundError("Trainer");
        }

        if (trainer.gymId !== client.gymId) {
            throw new Error("Trainer belongs to a different gym");
        }

        const dto = TrainerMapper.toTrainerResponseDTO(trainer);


        /**
         * remove salary and certificates.
         */
        return {
            ...dto,
            salary: "",
            certificates: undefined
        }
    }
}