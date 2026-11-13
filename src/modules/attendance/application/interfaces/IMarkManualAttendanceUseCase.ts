import { MarkManualAttendanceRequestDTO, AttendanceResponseDTO } from "../dtos/AttendanceDTO";

export interface IMarkManualAttendanceUseCase {
    execute(data: MarkManualAttendanceRequestDTO): Promise<AttendanceResponseDTO>;
}