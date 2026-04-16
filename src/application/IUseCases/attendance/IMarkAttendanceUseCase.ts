import { MarkAttendanceRequestDTO, AttendanceResponseDTO } from "../../dtos/attendance/AttendanceDTO";

export interface IMarkAttendanceUseCase {
    execute(data: MarkAttendanceRequestDTO): Promise<AttendanceResponseDTO>;
}