import { InitiateSignupRequestDTO } from "../../dtos/auth/InitiateSignupDTO";

export interface IInitiateSignupUseCase {
    execute(request: InitiateSignupRequestDTO): Promise<void>;
}