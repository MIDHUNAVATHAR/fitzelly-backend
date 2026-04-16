import { IWeightLogRepository, IWeightLog } from "../../../domain/repositories/IWeightLogRepository";

export class GetWeightLogsUseCase {
    constructor(private weightLogRepository: IWeightLogRepository) {}

    async execute(clientId: string): Promise<IWeightLog[]> {
        return await this.weightLogRepository.getLogsByClientId(clientId);
    }
}
