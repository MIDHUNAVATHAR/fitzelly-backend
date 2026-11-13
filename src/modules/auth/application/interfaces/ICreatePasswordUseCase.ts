import { CreatePasswordDTO } from "../dtos/CreatePasswordDTO";

export interface ICreatePasswordUseCase {
    execute(data: CreatePasswordDTO): Promise<void>;
}