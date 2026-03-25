import { IPaymentRepository } from "../../../domain/repositories/IPaymentRepository";

export class GetPaymentCollectionUseCase {
    constructor(private paymentRepository: IPaymentRepository) { }

    async execute(gymId: string, page: number, limit: number, startDate: Date, endDate: Date) {
        return await this.paymentRepository.getCollectionByGymId(gymId, page, limit, startDate, endDate);
    }
}
