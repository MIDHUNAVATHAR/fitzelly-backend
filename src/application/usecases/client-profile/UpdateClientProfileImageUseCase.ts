import { IClientRepository } from "../../../domain/repositories/IClientRepository";
import { IS3Service } from "../../../domain/services/IS3Service";

import { ClientProfileDTO } from "../../dtos/client-profile/ClientProfileDTO";
import { IUpdateClientProfileImageUseCase } from "../../IUseCases/client-profile/IUploadClientProfileImageUseCase";
import { ClientProfileMapper } from "../../mapper/ClientProfileMapper";



export class UpdateClientProfileImageUseCase implements IUpdateClientProfileImageUseCase {
    constructor(
        private _clientRepository: IClientRepository,
        private _s3Service: IS3Service
    ) { }

    async execute(clientId: string, file: Express.Multer.File): Promise<ClientProfileDTO> {
        const logoUrl = await this._s3Service.uploadFile(file);

        const client = await this._clientRepository.findById(clientId);
        const oldProfileUrl = client?.profileUrl;

        
        if (client) {
            const updatedClientEntity = Object.assign(Object.create(Object.getPrototypeOf(client)), client, {
                profileUrl: logoUrl
            });
            const updatedDoc = await this._clientRepository.updateClient(updatedClientEntity);

            if (updatedDoc && oldProfileUrl) {
        
                    await this._s3Service.deleteFile(oldProfileUrl);
             
            }

            return ClientProfileMapper.toDTO(updatedDoc);
        }
        throw new Error("Client not found");
    }
}
