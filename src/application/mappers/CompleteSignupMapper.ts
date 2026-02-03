import { Gym } from "../../domain/entities/Gym";
import { CompleteSignupRequestDTO } from "../dtos/CompleteSignupDTO";

export class GymSignupMapper {
    static toEntity(dto: CompleteSignupRequestDTO, hashedPassword: string): Gym {
        return new Gym("", dto.email, hashedPassword) //id will be genetated by DB 
    }
}