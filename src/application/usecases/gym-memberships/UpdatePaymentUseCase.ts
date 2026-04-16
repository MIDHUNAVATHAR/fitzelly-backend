import { IPaymentRepository } from "../../../domain/repositories/IPaymentRepository";

export interface UpdatePaymentDTO {
    paymentId: string;
    amount?: number;
    paymentDate?: string;
    note?: string;
}

export class UpdatePaymentUseCase {
    constructor(private paymentRepository: IPaymentRepository) { }

    async execute(data: UpdatePaymentDTO) {
        const updates: Record<string, unknown> = {};
        if (data.amount !== undefined) updates.amount = data.amount;
        if (data.paymentDate !== undefined) updates.paymentDate = new Date(data.paymentDate);
        if (data.note !== undefined) updates.note = data.note;

        return await this.paymentRepository.update(data.paymentId, updates);
    }
}
