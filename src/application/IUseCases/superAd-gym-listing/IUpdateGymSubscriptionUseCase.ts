import { GymResponseDTO } from "../../dtos/superAd-gym-listing/GetAllGymsDTO";
import { SubscriptionStatus } from "../../../domain/entities/Gym";

export interface IUpdateGymSubscriptionUseCase {
    execute(gymId: string, subscriptionStatus: SubscriptionStatus, expiryDate: Date): Promise<GymResponseDTO>;
}
