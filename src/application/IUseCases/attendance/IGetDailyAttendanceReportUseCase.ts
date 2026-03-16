import { DailyAttendanceReportDTO } from "../../dtos/attendance/AttendanceDTO";

export interface IGetDailyAttendanceReportUseCase {
    execute(gymId: string, date: Date, userType: "CLIENT" | "TRAINER"):
        Promise<DailyAttendanceReportDTO[]>
}