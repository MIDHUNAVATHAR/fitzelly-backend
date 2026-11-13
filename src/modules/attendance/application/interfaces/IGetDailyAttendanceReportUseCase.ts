import { DailyAttendanceReportDTO } from "../dtos/AttendanceDTO";

export interface IGetDailyAttendanceReportUseCase {
    execute(gymId: string, date: Date, userType: "CLIENT" | "TRAINER"):
        Promise<DailyAttendanceReportDTO[]>
}