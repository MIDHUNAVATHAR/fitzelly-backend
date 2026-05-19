import { IPaymentRepository } from "../../../domain/repositories/IPaymentRepository";
import { IDeletePaymentUseCase } from "../../IUseCases/gym-memberships/IGymMembershipUseCases";

export class DeletePaymentUseCase implements IDeletePaymentUseCase {
    constructor(private _paymentRepository: IPaymentRepository) { }

    async execute(paymentId: string) {
        return await this._paymentRepository.delete(paymentId);
    }
}
