import { IPaymentRepository } from "../../../domain/repositories/IPaymentRepository";

export class DeletePaymentUseCase {
    constructor(private paymentRepository: IPaymentRepository) { }

    async execute(paymentId: string) {
        return await this.paymentRepository.delete(paymentId);
    }
}
