import { IGymRepository } from "../../../domain/repositories/IGymRepository"; import { IUpdateGymSubscriptionUseCase } from "../../IUseCases/superAd-gym-listing/IUpdateGymSubscriptionUseCase";
import { GymResponseDTO } from "../../dtos/superAd-gym-listing/GetAllGymsDTO";
import { NotFoundError } from "../../errors/AppError";
import { GymMapper } from "../../mapper/SuperAdminGymMapper";
import { ISubscriptionRepository } from "../../../domain/repositories/ISubscriptionRepository";
import { Subscription } from "../../../domain/entities/Subscription";
import { SubscriptionStatus } from "../../../domain/entities/Gym";

export class UpdateGymSubscriptionUseCase implements IUpdateGymSubscriptionUseCase {
    constructor(
        private _gymRepository: IGymRepository,
        private _subscriptionRepository: ISubscriptionRepository
    ) { }

    async execute(gymId: string, subscriptionStatus: SubscriptionStatus, expiryDate: Date): Promise<GymResponseDTO> {
        const gym = await this._gymRepository.findById(gymId);
        if (!gym) {
            throw new NotFoundError("Gym");
        }

        /**
         * Update gym record
         */
        const updatedGym = await this._gymRepository.updateStatus(gymId, {
            subscriptionStatus,
            expiryDate
        });

        /**
         * Update latest subscription record if it exists
         */
        const latestSubscription = await this._subscriptionRepository.findLatestSubscriptionByGymId(gymId);
        if (latestSubscription) {
            const updatedSubscription = new Subscription(
                latestSubscription.id as string,
                latestSubscription.gymId,
                (latestSubscription.gymName || gym.gymName || "") as string,
                latestSubscription.planName,
                latestSubscription.amount,
                latestSubscription.startDate,
                expiryDate, // sync expiry date
                subscriptionStatus.toLowerCase() === 'active' ? 'active' : 'expired', // sync status (careful with lowercase)
                latestSubscription.paymentGateway,
                latestSubscription.gatewayPaymentId,
                latestSubscription.gatewayOrderId,
                latestSubscription.createdAt
            );
            await this._subscriptionRepository.update(updatedSubscription);
        }

        return GymMapper.toResponseDTO(updatedGym);
    }
}
