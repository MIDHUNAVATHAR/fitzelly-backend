import { IGoogleAuthService } from "../../../../shared/services/IGoogleAuthService";
import { IInitiateGoogleAuthUseCase } from "../interfaces/IInitiateGoogleAuthUseCase";

export class InitiateGoogleAuthUseCase implements IInitiateGoogleAuthUseCase {
    constructor(
        private googleAuthService: IGoogleAuthService
    ) { }

    execute(role: string, mode: string): string {
        return this.googleAuthService.generateAuthUrl(role, mode);
    }
}