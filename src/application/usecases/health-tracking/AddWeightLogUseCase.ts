import { IWeightLogRepository, IWeightLog } from "../../../domain/repositories/IWeightLogRepository";
import { IAddWeightLogUseCase } from "../../IUseCases/health-tracking/IWeightLogUseCases";

export class AddWeightLogUseCase implements IAddWeightLogUseCase {
    constructor(private _weightLogRepository: IWeightLogRepository) {}

    async execute(log: IWeightLog): Promise<IWeightLog> {
        return await this._weightLogRepository.addLog(log);
    }
}
