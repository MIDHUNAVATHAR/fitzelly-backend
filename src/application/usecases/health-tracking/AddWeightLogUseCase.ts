import { IWeightLogRepository, IWeightLog } from "../../../domain/repositories/IWeightLogRepository";

export class AddWeightLogUseCase {
    constructor(private weightLogRepository: IWeightLogRepository) {}

    async execute(log: IWeightLog): Promise<IWeightLog> {
        return await this.weightLogRepository.addLog(log);
    }
}
