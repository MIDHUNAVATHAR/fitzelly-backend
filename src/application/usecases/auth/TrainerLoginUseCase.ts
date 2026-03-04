import { ROLES } from "../../../constants/roles.constants";
import { EmailNotVerifiedError} from "../../../domain/errors/DomainError";
import { ITrainerRepository } from "../../../domain/repositories/ITrainerRepository";
import { IPasswordHasher } from "../../../domain/services/IPasswordHasher";
import { ITokenService } from "../../../domain/services/ITokenService";
import { TrainerLoginResponseDTO, TrainerLoginRequestDTO } from "../../dtos/auth/TrainerLoginDTO";
import { AuthenticationFailedError, NotFoundError } from "../../errors/AppError";
import { ITrainerLoginUseCase } from "../../IUseCases/auth/ITrainerLoginUseCase";



export class TrainerLoginUseCase implements ITrainerLoginUseCase {
    constructor(
        private _trainerRepository: ITrainerRepository,
        private _passwordHasher: IPasswordHasher,
        private _tokenService: ITokenService
    ) { }

    async execute(data: TrainerLoginRequestDTO): Promise<TrainerLoginResponseDTO> {
        const trainer = await this._trainerRepository.findByEmail(data.email);

        if (!trainer) {
            throw new NotFoundError("Trainer");
        }

       
        if (!trainer.isEmailVerified) {
            throw new EmailNotVerifiedError(trainer.email)
        }

        if (!trainer.password) {
            throw new AuthenticationFailedError();
        }
        const isPasswordValid = await this._passwordHasher.compare(data.password, trainer.password);

        if (!isPasswordValid) {
            throw new AuthenticationFailedError();
        }


        const payload = {
            id: trainer.id,
            email: trainer.email,
            role: ROLES.TRAINER
        }

        const accessToken = this._tokenService.generateAccessToken(payload);
        const refreshToken = this._tokenService.generateRefreshToken(payload);

        return {
            accessToken,
            refreshToken,
            trainer: {
                id: trainer.id,
                email: trainer.email,
                role: ROLES.TRAINER
            }
        }

    }
}