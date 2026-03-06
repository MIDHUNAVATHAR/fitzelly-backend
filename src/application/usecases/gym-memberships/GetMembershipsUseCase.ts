import { IMembershipRepository } from "../../../domain/repositories/IMembershipRepository";
import { IPaymentRepository } from "../../../domain/repositories/IPaymentRepository";
import { IPlanRepository } from "../../../domain/repositories/IPlanRepository";

export class GetMembershipsUseCase {
    constructor(
        private membershipRepository: IMembershipRepository,
        private paymentRepository: IPaymentRepository,
        private planRepository: IPlanRepository
    ) { }

    async execute(gymId: string, page: number = 1, limit: number = 10, search: string = '', status?: string) {
        const result = await this.membershipRepository.findByGymId(gymId, page, limit, search, status);
        const memberships = result.memberships;

        // Fetch a large limit for plans to map correctly within this context
        const plansData = await this.planRepository.findAllByGym(gymId, 1, 1000);
        const plans = plansData.plans;
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
        return { memberships: results, total: result.total };
    }
}
