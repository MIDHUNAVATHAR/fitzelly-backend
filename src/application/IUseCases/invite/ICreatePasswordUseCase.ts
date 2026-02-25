import { CreatePasswordDTO } from "../../dtos/invite/CreatePasswordDTO";

export interface ICreatePasswordUseCase {
    execute(data: CreatePasswordDTO): Promise<void>;
}