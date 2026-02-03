import { ForgotPasswordRequestDTO } from "../dtos/ForgotPasswordDTO";

export interface IInitiateForgotPasswordUseCase {
    execute(request: ForgotPasswordRequestDTO): Promise<void>;
}