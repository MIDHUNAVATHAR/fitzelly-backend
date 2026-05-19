import { IPaymentRepository } from "../../../domain/repositories/IPaymentRepository";
import { IMembershipRepository } from "../../../domain/repositories/IMembershipRepository";
import { Payment } from "../../../domain/entities/Payment";
import { IAddPaymentUseCase } from "../../IUseCases/gym-memberships/IGymMembershipUseCases";
import { AddPaymentDTO } from "../../dtos/gym-client/ClientProfileWithMembershipDTO";


export class AddPaymentUseCase implements IAddPaymentUseCase {
    constructor(
        private _paymentRepository: IPaymentRepository,
        private _membershipRepository: IMembershipRepository
    ) { }

    async execute(data: AddPaymentDTO) {
        /**
         * validate if membership belongs to the gym 
         */
        const membership = await this._membershipRepository.findById(data.membershipId);
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

        return await this._paymentRepository.create(payment);
    }
}
