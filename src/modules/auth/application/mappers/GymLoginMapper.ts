import { Gym } from "../../../gyms/domain/entities/Gym";
import { LoginResponseDTO } from "../dtos/LoginDTO";

export class GymLoginMapper {
    static toDTO(user: Gym, accessToken: string, refreshToken: string): LoginResponseDTO {
        return {
            id: user.id,
            email: user.email,
            role: user.role,
            gymId: user.id,
            accessToken,
            refreshToken
        }
    }
}