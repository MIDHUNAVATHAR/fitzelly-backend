import { IClientRepository } from "../../../domain/repositories/IClientRepository";
import { IGymRepository } from "../../../domain/repositories/IGymRepository";
import { GymProfileDTO } from "../../dtos/gym-profile/GymProfileDTO";
import { IGetClientGymDetailsUseCase } from "../../IUseCases/client-profile/IGetClientGymDetailsUseCase";
import { NotFoundError } from "../../../domain/errors/NotFoundError";
import { GymProfileMapper } from "../../mapper/GymProfileMapper";

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
