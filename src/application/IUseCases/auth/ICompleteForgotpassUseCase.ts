import { CompleteForgotPasswordRequestDTO } from "../../dtos/auth/ForgotPasswordDTO";

export interface ICompleteForgotpassUseCase {
    execute(request: CompleteForgotPasswordRequestDTO): Promise<void>;
}