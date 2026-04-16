import { AttendanceResponseDTO } from "../../dtos/attendance/AttendanceDTO";

export interface IGetTodayAttendanceUseCase {
    execute(userId: string): Promise<AttendanceResponseDTO | null>;
}