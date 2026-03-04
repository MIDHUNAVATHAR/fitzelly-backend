import { CreatePasswordDTO } from "../../dtos/auth/CreatePasswordDTO";

export interface ICreatePasswordUseCase {
    execute(data: CreatePasswordDTO): Promise<void>;
}