import { IClientRepository } from "../../domain/repositories/IClientRepository";
import { IGymRepository } from "../../../gyms/domain/repositories/IGymRepository";
import { GymProfileDTO } from "../../../gyms/application/dtos/GymProfileDTO";
import { IGetClientGymDetailsUseCase } from "../interfaces/IGetClientGymDetailsUseCase";
import { NotFoundError } from "../../../../shared/errors/NotFoundError";
import { GymProfileMapper } from "../../../gyms/application/dtos/GymProfileMapper";

export class GetClientGymDetailsUseCase implements IGetClientGymDetailsUseCase {
    constructor(
        private clientRepository: IClientRepository,
        private gymRepository: IGymRepository
    ) { }

    async execute(clientId: string): Promise<GymProfileDTO> {
        const client = await this.clientRepository.findById(clientId);
        if (!client) {
            throw new NotFoundError("Client");
        }

        if (!client.gymId) {
            throw new NotFoundError("Client Gym Mapping");
        }

        const gym = await this.gymRepository.findById(client.gymId);
        if (!gym) {
            throw new NotFoundError("Gym");
        }

        return GymProfileMapper.toDTO(gym);
    }
}
