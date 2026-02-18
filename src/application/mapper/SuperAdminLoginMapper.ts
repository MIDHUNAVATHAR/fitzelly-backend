import { SuperAdmin } from "../../domain/entities/SuperAdmin";
import { LoginResponseDTO } from "../dtos/LoginDTO";

export class SuperAdminLoginMapper {
    static toDTO(user: SuperAdmin, accessToken: string, refreshToken: string): LoginResponseDTO {
        return {
            id: user.id,
            email: user.email,
            role: user.role,
            accessToken,
            refreshToken
        }
    }
}