import { LoginRequestDTO, LoginResponseDTO } from "../dtos/LoginDTO";

export interface ILoginUseCase {
    execute(request: LoginRequestDTO): Promise<LoginResponseDTO>;
}