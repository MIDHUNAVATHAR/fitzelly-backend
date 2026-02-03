import { IGoogleAuthService } from "../../domain/services/IGoogleAuthService";
import { IInitiateGoogleAuthUseCase } from "../IUseCases/IInitiateGoogleAuthUseCase";

export class InitiateGoogleAuthUseCase implements IInitiateGoogleAuthUseCase {
    constructor(
        private googleAuthService: IGoogleAuthService
    ) { }

    execute(role: string, mode: string): string {
        return this.googleAuthService.generateAuthUrl(role, mode);
    }
}