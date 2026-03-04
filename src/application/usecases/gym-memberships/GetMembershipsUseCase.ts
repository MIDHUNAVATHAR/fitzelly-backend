import { IMembershipRepository } from "../../../domain/repositories/IMembershipRepository";
import { IPaymentRepository } from "../../../domain/repositories/IPaymentRepository";
import { IPlanRepository } from "../../../domain/repositories/IPlanRepository";

export class GetMembershipsUseCase {
    constructor(
        private membershipRepository: IMembershipRepository,
        private paymentRepository: IPaymentRepository,
        private planRepository: IPlanRepository
    ) { }

    async execute(gymId: string) {
        const memberships = await this.membershipRepository.findByGymId(gymId);
        const plans = await this.planRepository.findAllByGym(gymId);
        const planMap = new Map(plans.map(p => [p.id, p]));

        const results = [];
        for (const membership of memberships) {
            const payments = await this.paymentRepository.getPaymentsByMembershipId(membership.id);
            const totalPaid = payments.reduce((acc, curr) => acc + curr.amount, 0);

            const plan = planMap.get(membership.planId);
            const planAmount = plan ? plan.price : 0;

            let paymentStatus = 'UNPAID';
            if (totalPaid >= planAmount && planAmount > 0) {
                paymentStatus = 'PAID';
            } else if (totalPaid > 0) {
                paymentStatus = 'PARTIAL';
            }

            results.push({
                id: membership.id,
                clientId: membership.clientId,
                clientName: membership.clientName,
                planId: membership.planId,
                planName: membership.planName,
                planType: membership.planType,
                startDate: membership.startDate,
                expiryDate: membership.expiryDate,
                status: membership.status,
                daysLeft: membership.daysLeft,
                assignedTrainerId: membership.assignedTrainerId,
                assignedTrainerName: membership.assignedTrainerName,
                paymentStatus,
                totalPaid,
                planAmount
            });
        }
        return results;
    }
}
