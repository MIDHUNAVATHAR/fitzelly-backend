import { AttendanceResponseDTO } from "../dtos/AttendanceDTO";

export interface IGetTodayAttendanceUseCase {
    execute(userId: string): Promise<AttendanceResponseDTO | null>;
}