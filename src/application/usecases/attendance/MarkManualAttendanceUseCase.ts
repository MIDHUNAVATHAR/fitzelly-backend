import { Attendance } from "../../../domain/entities/Attendance";
import { IAttendanceRepository } from "../../../domain/repositories/IAttendanceRepository";
import { MarkManualAttendanceRequestDTO, AttendanceResponseDTO } from "../../dtos/attendance/AttendanceDTO";
import { IMarkManualAttendanceUseCase } from "../../IUseCases/attendance/IMarkManualAttendanceUseCase";
import { ISocketService } from "../../../domain/services/ISocketService";

export class MarkManualAttendanceUseCase implements IMarkManualAttendanceUseCase {
    constructor(
        private _attendanceRepository: IAttendanceRepository,
        private _socketService: ISocketService
    ) { };

    async execute(data: MarkManualAttendanceRequestDTO): Promise<AttendanceResponseDTO> {
        const date = new Date(data.date);
        const startOfDay = new Date(date);
        startOfDay.setHours(0, 0, 0, 0);

        let attendance = await this._attendanceRepository.findByUserAndDate(data.userId, startOfDay);

        if (attendance) {
            /**
             * update existing record
             */
            const updatedAttendance = new Attendance(
                attendance.id,
                attendance.userId,
                attendance.gymId,
                attendance.date,
                attendance.logs,
                data.status,
                attendance.userType,
                attendance.isDeleted
            );
            await this._attendanceRepository.update(updatedAttendance);
            attendance = updatedAttendance;
        } else {
            /**
             * create new record
             */
            const newAttendance = new Attendance(
                "",
                data.userId,
                data.gymId,
                startOfDay,
                [],
                data.status,
                data.userType
            );
            const created = await this._attendanceRepository.create(newAttendance);
            attendance = created;
        }

        this._socketService.emitToGym(data.gymId, "attendanceUpdated", {
            userId: data.userId,
            status: attendance.status
        });

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
        }
    }
}