import { IPaymentRepository } from "../../../payments/domain/repositories/IPaymentRepository";
import { IUpdatePaymentUseCase } from "../interfaces/IGymMembershipUseCases";
import { UpdatePaymentDTO } from "../../../clients/application/dtos/ClientProfileWithMembershipDTO";



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

