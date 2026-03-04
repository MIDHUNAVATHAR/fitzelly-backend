
import { CompleteSignupRequestDTO } from "../../dtos/auth/CompleteSignupDTO";


export interface ICompleteSignupUseCase {
    execute(request: CompleteSignupRequestDTO): Promise<void>;
}