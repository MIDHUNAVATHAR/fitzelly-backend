import { IAttendanceRepository } from "../../../domain/repositories/IAttendanceRepository";
import { IGetYearlyAttendanceCountUseCase } from "../../IUseCases/attendance/IGetYearlyAttendanceCountUseCase";

export class GetYearlyAttendanceCountUseCase implements IGetYearlyAttendanceCountUseCase {
    constructor(private _attendanceRepository: IAttendanceRepository) {}

    async execute(userId: string, year: number): Promise<number> {
        return await this._attendanceRepository.countPresentDaysInYear(userId, year);
    }
}
