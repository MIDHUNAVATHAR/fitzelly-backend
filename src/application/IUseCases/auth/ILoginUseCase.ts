import { LoginRequestDTO, LoginResponseDTO } from "../../dtos/auth/LoginDTO";

export interface ILoginUseCase {
    execute(request: LoginRequestDTO): Promise<LoginResponseDTO>;
}