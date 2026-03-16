import { IAttendanceRepository } from "../../../domain/repositories/IAttendanceRepository";
import { AttendanceResponseDTO } from "../../dtos/attendance/AttendanceDTO";
import { IGetTodayAttendanceUseCase } from "../../IUseCases/attendance/IGetTodayAttendanceUseCase";


export class GetTodayAttendanceUseCase implements IGetTodayAttendanceUseCase {
    constructor(
        private _attendanceRepository: IAttendanceRepository
    ) { }

    async execute(userId: string): Promise<AttendanceResponseDTO | null> {
        const today = new Date();
        const startOfDay = new Date(today);
        startOfDay.setHours(0, 0, 0, 0);

        const attendance = await this._attendanceRepository.findByUserAndDate(userId, startOfDay);

        if (!attendance) return null;

        return {
            id: attendance.id,
            userId: attendance.userId,
            date: attendance.date.toISOString(),
            logs: attendance.logs.map(log => ({
                checkIn: log.checkIn.toISOString(),
                checkOut: log.checkOut?.toISOString()
            })),
            status: attendance.status,
            userType: attendance.userType
        };
    }
}
