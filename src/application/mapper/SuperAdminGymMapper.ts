import { GymResponseDTO } from "../dtos/GetAllGymsDTO";
import { Gym } from "../../domain/entities/Gym";

export class GymMapper {
    static toResponseDTO(gym:Gym):GymResponseDTO {
        return {
            _id: gym.id,
            gymName: gym.gymName,
            email: gym.email,
            phone: gym.phoneNumber,
            address: gym.address,
            approvalStatus: gym.approvalStatus,
            subscriptionStatus: gym.subscriptionStatus,
            expiryDate: gym.expiryDate?.toISOString(),
            logoUrl: gym.logoUrl,
            caption: gym.caption,
            description: gym.description,
            location: gym.location,
            createdAt: gym.createdAt.toISOString(),
        }
    }
    static toResponseDTOList(gyms:Gym[]):GymResponseDTO[]{
        return gyms.map(gym=>this.toResponseDTO(gym));
    }
}