import { GymResponseDTO } from "../dtos/superAd-gym-listing/GetAllGymsDTO";
import { Gym, SubscriptionStatus } from "../../domain/entities/Gym";
import { Subscription } from "../../domain/entities/Subscription";


export class GymMapper {
    static toResponseDTO(gym: Gym, latestSubscription?: Subscription | null): GymResponseDTO {

        let subscriptionStatus = 'Pending';
        let expiryDate = undefined;

        if (latestSubscription) {
            subscriptionStatus = latestSubscription.status;
            if (new Date() > latestSubscription.endDate) {
                subscriptionStatus = "Expired";
            }
            subscriptionStatus = subscriptionStatus.charAt(0).toUpperCase() + subscriptionStatus.slice(1);
            expiryDate = latestSubscription.endDate.toISOString();
        }

        return {
            _id: gym.id,
            gymName: gym.gymName,
            email: gym.email,
            phone: gym.phoneNumber,
            address: gym.address,
            approvalStatus: gym.approvalStatus,
            subscriptionStatus: subscriptionStatus as SubscriptionStatus,
            expiryDate: expiryDate,
            logoUrl: gym.logoUrl,
            caption: gym.caption,
            description: gym.description,
            location: gym.location,
            createdAt: gym.createdAt.toISOString(),
            certificates: gym.certificates || [],
            latestSubscription: latestSubscription ? {
                planName: latestSubscription.planName,
                amount: latestSubscription.amount,
                startDate: latestSubscription.startDate,
                endDate: latestSubscription.endDate,
                status: subscriptionStatus,
                paymentGateway: latestSubscription.paymentGateway,
                gatewayPaymentId: latestSubscription.gatewayPaymentId
            } : undefined
        }
    }
    static toResponseDTOList(gyms: Gym[]): GymResponseDTO[] {
        return gyms.map(gym => this.toResponseDTO(gym));
    }
}