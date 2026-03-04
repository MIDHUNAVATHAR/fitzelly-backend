import { Gym } from "../../domain/entities/Gym";
import { CompleteSignupRequestDTO } from "../dtos/auth/CompleteSignupDTO";

export class GymSignupMapper {
    static toEntity(dto: CompleteSignupRequestDTO, hashedPassword: string): Gym {
        return new Gym("", dto.email, hashedPassword) 
    }
}