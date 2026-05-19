import { IPaymentRepository } from "../../../domain/repositories/IPaymentRepository";
import { IUpdatePaymentUseCase } from "../../IUseCases/gym-memberships/IGymMembershipUseCases";
import { UpdatePaymentDTO } from "../../dtos/gym-client/ClientProfileWithMembershipDTO";



export class UpdatePaymentUseCase implements IUpdatePaymentUseCase {
    constructor(private _paymentRepository: IPaymentRepository) { }

    async execute(data: UpdatePaymentDTO) {
        const updates: Record<string, unknown> = {};
        if (data.amount !== undefined) updates.amount = data.amount;
        if (data.paymentDate !== undefined) updates.paymentDate = new Date(data.paymentDate);
        if (data.note !== undefined) updates.note = data.note;

        return await this._paymentRepository.update(data.paymentId, updates);
    }
}

