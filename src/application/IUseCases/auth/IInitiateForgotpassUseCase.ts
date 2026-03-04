import { ForgotPasswordRequestDTO } from "../../dtos/auth/ForgotPasswordDTO";

export interface IInitiateForgotPasswordUseCase {
    execute(request: ForgotPasswordRequestDTO): Promise<void>;
}