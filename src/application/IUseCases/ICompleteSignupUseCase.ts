
import { CompleteSignupRequestDTO } from "../dtos/CompleteSignupDTO";


export interface ICompleteSignupUseCase {
    execute(request: CompleteSignupRequestDTO): Promise<void>;
}