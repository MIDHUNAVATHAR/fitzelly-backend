import { Attendance } from "../../../domain/entities/Attendance";
import { IAttendanceRepository } from "../../../domain/repositories/IAttendanceRepository";
import { MarkManualAttendanceRequestDTO, AttendanceResponseDTO } from "../../dtos/attendance/AttendanceDTO";
import { IMarkManualAttendanceUseCase } from "../../IUseCases/attendance/IMarkManualAttendanceUseCase";
import { ISocketService } from "../../../domain/services/ISocketService";
import { IMembershipRepository } from "../../../domain/repositories/IMembershipRepository";

export class MarkManualAttendanceUseCase implements IMarkManualAttendanceUseCase {
    constructor(
        private _attendanceRepository: IAttendanceRepository,
        private _socketService: ISocketService,
        private _membershipRepository: IMembershipRepository
    ) { };

    async execute(data: MarkManualAttendanceRequestDTO): Promise<AttendanceResponseDTO> {
        const date = new Date(data.date);
        const startOfDay = new Date(date);
        startOfDay.setHours(0, 0, 0, 0);

        let attendance = await this._attendanceRepository.findByUserAndDate(data.userId, startOfDay);

        const oldStatus = attendance?.status;
        const newStatus = data.status;

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

        // Handle Membership transitions for day-based plans
        if (data.userType === "CLIENT") {
            const activeMembership = await this._membershipRepository.findLatestByClientId(data.userId);
            if (activeMembership && (activeMembership.status === "ACTIVE" || activeMembership.status === "EXPIRED") && activeMembership.planType === "DAY_BASED") {
                
                let dayChange = 0;
                if (oldStatus !== "PRESENT" && newStatus === "PRESENT") {
                    dayChange = -1;
                } else if (oldStatus === "PRESENT" && newStatus !== "PRESENT") {
                    dayChange = 1;
                }

                if (dayChange !== 0) {
                    const currentDays = activeMembership.daysLeft || 0;
                    const newDays = Math.max(0, currentDays + dayChange);
                    const updatedStatus = newDays === 0 ? "EXPIRED" : "ACTIVE";
                    
                    await this._membershipRepository.update(activeMembership.id, {
                        daysLeft: newDays,
                        status: updatedStatus
                    });
                }
            }
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