import { CompleteForgotPasswordRequestDTO } from "../dtos/ForgotPasswordDTO";

export interface ICompleteForgotpassUseCase {
    execute(request: CompleteForgotPasswordRequestDTO): Promise<void>;
}