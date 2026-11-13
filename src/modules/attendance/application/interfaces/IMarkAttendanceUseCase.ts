import { MarkAttendanceRequestDTO, AttendanceResponseDTO } from "../dtos/AttendanceDTO";

export interface IMarkAttendanceUseCase {
    execute(data: MarkAttendanceRequestDTO): Promise<AttendanceResponseDTO>;
}