import { ResetPasswordRequestDTO } from "../../dtos/auth/ForgotPasswordDTO";

export interface IResetPasswordUseCase {
    execute(request: ResetPasswordRequestDTO): Promise<void>;
}