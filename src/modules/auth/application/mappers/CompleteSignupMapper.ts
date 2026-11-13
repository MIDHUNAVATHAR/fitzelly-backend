import { Gym } from "../../../gyms/domain/entities/Gym";
import { CompleteSignupRequestDTO } from "../dtos/CompleteSignupDTO";

export class GymSignupMapper {
    static toEntity(dto: CompleteSignupRequestDTO, hashedPassword: string): Gym {
        return new Gym("", dto.email, hashedPassword) 
    }
}