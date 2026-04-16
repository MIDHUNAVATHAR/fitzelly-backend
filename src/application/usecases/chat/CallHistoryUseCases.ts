import { ICallHistoryRepository } from "../../../domain/repositories/ICallHistoryRepository";
import { ICallHistoryDocument } from "../../../infrastructure/database/mongoose/types/ICallHistoryDocument";

export class SaveCallHistoryUseCase {
    constructor(private callHistoryRepository: ICallHistoryRepository) { }
    async execute(data: Partial<ICallHistoryDocument>) {
        return await this.callHistoryRepository.saveCallHistory(data);
    }
}

export class GetUserCallHistoryUseCase {
    constructor(private callHistoryRepository: ICallHistoryRepository) { }
    async execute(userId: string) {
        return await this.callHistoryRepository.getCallHistoryByUserId(userId);
    }
}
