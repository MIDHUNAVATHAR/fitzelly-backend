import { IWeightLogRepository, IWeightLog } from "../../domain/repositories/IWeightLogRepository";
import { IGetWeightLogsUseCase } from "../interfaces/IWeightLogUseCases";

export class GetWeightLogsUseCase implements IGetWeightLogsUseCase {
    constructor(private _weightLogRepository: IWeightLogRepository) {}

    async execute(clientId: string): Promise<IWeightLog[]> {
        return await this._weightLogRepository.getLogsByClientId(clientId);
    }
}
