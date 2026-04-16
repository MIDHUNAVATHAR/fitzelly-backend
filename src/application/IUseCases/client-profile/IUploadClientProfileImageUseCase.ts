import { ClientProfileDTO } from "../../dtos/client-profile/ClientProfileDTO";


export interface IUpdateClientProfileImageUseCase {
    execute(clientId: string, file: Express.Multer.File): Promise<ClientProfileDTO>;
}
