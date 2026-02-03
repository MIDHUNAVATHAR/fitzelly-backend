import { InitiateSignupRequestDTO } from "../dtos/InitiateSignupDTO";

export interface IInitiateSignupUseCase {
    execute(request: InitiateSignupRequestDTO): Promise<void>;
}