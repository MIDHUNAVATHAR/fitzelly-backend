import { ClientProfileDTO } from "../dtos/ClientProfileDTO";


export interface IUpdateClientProfileImageUseCase {
    execute(clientId: string, file: Express.Multer.File): Promise<ClientProfileDTO>;
}
