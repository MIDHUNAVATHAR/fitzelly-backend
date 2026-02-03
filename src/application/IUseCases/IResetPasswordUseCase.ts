import { ResetPasswordRequestDTO } from "../dtos/ForgotPasswordDTO";

export interface IResetPasswordUseCase {
    execute(request: ResetPasswordRequestDTO): Promise<void>;
}