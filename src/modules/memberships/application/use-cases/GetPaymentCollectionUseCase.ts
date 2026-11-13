import { IPaymentRepository } from "../../../payments/domain/repositories/IPaymentRepository";
import { IGetPaymentCollectionUseCase } from "../interfaces/IGymMembershipUseCases";

export class GetPaymentCollectionUseCase implements IGetPaymentCollectionUseCase {
    constructor(private _paymentRepository: IPaymentRepository) { }

    async execute(gymId: string, page: number, limit: number, startDate: Date, endDate: Date) {
        return await this._paymentRepository.getCollectionByGymId(gymId, page, limit, startDate, endDate);
    }
}
