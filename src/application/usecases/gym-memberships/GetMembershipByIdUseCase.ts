import { IMembershipRepository } from "../../../domain/repositories/IMembershipRepository";
import { IPaymentRepository } from "../../../domain/repositories/IPaymentRepository";
import { IPlanRepository } from "../../../domain/repositories/IPlanRepository";

export class GetMembershipByIdUseCase {
    constructor(
        private membershipRepository: IMembershipRepository,
        private paymentRepository: IPaymentRepository,
        private planRepository: IPlanRepository
    ) { }

    async execute(membershipId: string, gymId: string) {
        const membership = await this.membershipRepository.findById(membershipId);
        if (!membership || membership.gymId !== gymId) throw new Error("Membership not found.");

        const payments = await this.paymentRepository.getPaymentsByMembershipId(membership.id);
        const totalPaid = payments.reduce((acc, curr) => acc + curr.amount, 0);

        const plan = await this.planRepository.findById(membership.planId);
        const planAmount = plan ? plan.price : 0;

        let paymentStatus = 'UNPAID';
        if (totalPaid >= planAmount && planAmount > 0) {
            paymentStatus = 'PAID';
        } else if (totalPaid > 0) {
            paymentStatus = 'PARTIAL';
        }

        return {
            membership,
            paymentSummary: {
                totalPaid,
                planAmount,
                paymentStatus,
                payments
            }
        };
    }
}
