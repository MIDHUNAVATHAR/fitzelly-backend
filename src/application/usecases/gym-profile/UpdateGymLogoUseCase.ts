import { IGymRepository } from "../../../domain/repositories/IGymRepository";
import { IS3Service } from "../../../domain/services/IS3Service";
import { GymProfileDTO } from "../../dtos/gym-profile/GymProfileDTO";
import { IUpdateGymLogoUseCase } from "../../IUseCases/gym-profile/IUpdateGymLogoUseCase";
import { GymProfileMapper } from "../../mapper/GymProfileMapper";

export class UpdateGymLogoUseCase implements IUpdateGymLogoUseCase {
    constructor(
        private _gymrepository: IGymRepository,
        private _s3Service: IS3Service
    ) { }

    async execute(id: string, file: Express.Multer.File): Promise<GymProfileDTO> {
        const gym = await this._gymrepository.findById(id);
        const oldLogoUrl = gym?.logoUrl;

        const logoUrl = await this._s3Service.uploadFile(file)

        const updatedGymDoc = await this._gymrepository.updateLogo(id, logoUrl);

        /**
         * delete old logo from s3 bucket after successfull update
         */
        if (updatedGymDoc && oldLogoUrl) {
            await this._s3Service.deleteFile(oldLogoUrl);
        }

        return GymProfileMapper.toDTO(updatedGymDoc)
    }
}