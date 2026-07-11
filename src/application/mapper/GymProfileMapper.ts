import { GymProfileDTO } from "../dtos/gym-profile/GymProfileDTO";
import { Gym } from "../../domain/entities/Gym";


export class GymProfileMapper {
    static toDTO(gym: Gym): GymProfileDTO {
        return {
            logoUrl: gym.logoUrl ?? "",
            gymName: gym.gymName ?? "",
            caption: gym.caption ?? "",
            email: gym.email,
            phoneNumber: gym.phoneNumber ?? "",
            address: gym.address ?? "",
            description: gym.description ?? "",
            location: { latitude: gym.location?.latitude ?? 0, longitude: gym.location?.longitude ?? 0 },
            approvalStatus: gym.approvalStatus ?? "",
            expiryDate: gym.expiryDate ?? "",
            certificates: gym.certificates || [],
            rejectionReason: gym.rejectionReason ?? ""
        }
    }
}