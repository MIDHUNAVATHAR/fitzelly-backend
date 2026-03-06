import { IClientRepository } from "../../domain/repositories/IClientRepository";
import { ITrainerRepository } from "../../domain/repositories/ITrainerRepository";

export interface IGetRepoByUserType {
    getRepo(userType: string): IClientRepository | ITrainerRepository | undefined;
}