import { MarkManualAttendanceRequestDTO, AttendanceResponseDTO } from "../../dtos/attendance/AttendanceDTO";

export interface IMarkManualAttendanceUseCase {
    execute(data: MarkManualAttendanceRequestDTO): Promise<AttendanceResponseDTO>;
}