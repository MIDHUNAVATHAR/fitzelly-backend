import { IGetRepoByUserType } from "../../application/interfaces/IGetRepoByUserType";
import { IClientRepository } from "../../domain/repositories/IClientRepository";
import { ITrainerRepository } from "../../domain/repositories/ITrainerRepository";


export class GetRepoByUserType implements IGetRepoByUserType {
    constructor(
        private clientRepository: IClientRepository,
        private trainerRepository: ITrainerRepository
    ) { }

    getRepo(userType: string) {
        if (userType === "client") {
            return this.clientRepository;
        } else if (userType === "trainer") {
            return this.trainerRepository;
        }
    }
}