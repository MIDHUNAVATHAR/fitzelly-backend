import { IPaymentRepository } from "../../../domain/repositories/IPaymentRepository";
import { IGetPaymentCollectionUseCase } from "../../IUseCases/gym-memberships/IGymMembershipUseCases";

export class GetPaymentCollectionUseCase implements IGetPaymentCollectionUseCase {
    constructor(private _paymentRepository: IPaymentRepository) { }

    async execute(gymId: string, page: number, limit: number, startDate: Date, endDate: Date) {
        return await this._paymentRepository.getCollectionByGymId(gymId, page, limit, startDate, endDate);
    }
}
