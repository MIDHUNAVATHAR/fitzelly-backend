import { IPaymentRepository } from "../../../domain/repositories/IPaymentRepository";
import { IMembershipRepository } from "../../../domain/repositories/IMembershipRepository";
import { Payment } from "../../../domain/entities/Payment";

export interface AddPaymentDTO {
    gymId: string;
    membershipId: string;
    amount: number;
    paymentDate: string;
    note?: string;
}

export class AddPaymentUseCase {
    constructor(
        private paymentRepository: IPaymentRepository,
        private membershipRepository: IMembershipRepository
    ) { }

    async execute(data: AddPaymentDTO) {
        /**
         * validate if membership belongs to the gym 
         */
        const membership = await this.membershipRepository.findById(data.membershipId);
        if (!membership || membership.gymId !== data.gymId) {
            throw new Error("Membership not found.");
        }

        const payment = new Payment(
            '',
            data.membershipId,
            data.amount,
            new Date(data.paymentDate),
            data.note || null,
            false
        );

        return await this.paymentRepository.create(payment);
    }
}
