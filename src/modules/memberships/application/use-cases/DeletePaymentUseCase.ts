import { IPaymentRepository } from "../../../payments/domain/repositories/IPaymentRepository";
import { IDeletePaymentUseCase } from "../interfaces/IGymMembershipUseCases";

export class DeletePaymentUseCase implements IDeletePaymentUseCase {
    constructor(private _paymentRepository: IPaymentRepository) { }

    async execute(paymentId: string) {
        return await this._paymentRepository.delete(paymentId);
    }
}
