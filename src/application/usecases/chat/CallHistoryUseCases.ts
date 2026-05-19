import { ICallHistoryRepository } from "../../../domain/repositories/ICallHistoryRepository";
import { ICallHistoryDocument } from "../../../infrastructure/database/mongoose/types/ICallHistoryDocument";
import { ISaveCallHistoryUseCase } from "../../IUseCases/chat/ICallHistoryUseCases";

export class SaveCallHistoryUseCase implements ISaveCallHistoryUseCase {
    constructor(private _callHistoryRepository: ICallHistoryRepository) { }
    async execute(data: Partial<ICallHistoryDocument>) {
        return await this._callHistoryRepository.saveCallHistory(data);
    }
}

export class GetUserCallHistoryUseCase {
    constructor(private _callHistoryRepository: ICallHistoryRepository) { }
    async execute(userId: string) {
        return await this._callHistoryRepository.getCallHistoryByUserId(userId);
    }
}
