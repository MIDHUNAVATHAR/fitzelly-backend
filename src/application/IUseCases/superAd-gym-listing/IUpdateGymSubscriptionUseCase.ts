import { GymResponseDTO } from "../../dtos/superAd-gym-listing/GetAllGymsDTO";

export interface IUpdateGymSubscriptionUseCase {
    execute(gymId: string, subscriptionStatus: string, expiryDate: Date): Promise<GymResponseDTO>;
}
