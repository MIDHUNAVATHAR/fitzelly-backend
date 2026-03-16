import { Attendance } from "../../../domain/entities/Attendance";
import { IAttendanceRepository } from "../../../domain/repositories/IAttendanceRepository";
import { IGymRepository } from "../../../domain/repositories/IGymRepository";
import { MarkAttendanceRequestDTO, AttendanceResponseDTO } from "../../dtos/attendance/AttendanceDTO";
import { BadRequestError } from "../../errors/AppError";
import { IMarkAttendanceUseCase } from "../../IUseCases/attendance/IMarkAttendanceUseCase";
import { isWithin50Km } from "../../utils/location.util";
import { ISocketService } from "../../../domain/services/ISocketService";



export class MarkAttendenceUseCase implements IMarkAttendanceUseCase {
    constructor(
        private _attendanceRepository: IAttendanceRepository,
        private _gymRepository: IGymRepository,
        private _socketService: ISocketService
    ) { };

    async execute(data: MarkAttendanceRequestDTO): Promise<AttendanceResponseDTO> {
        const today = new Date();
        const startOfDay = new Date(today);
        startOfDay.setHours(0, 0, 0, 0);

        /**
         * geofencing check for all actions
         */
        const gym = await this._gymRepository.findById(data.gymId);
        if (!gym) {
            throw new BadRequestError("Gym not found");
        }

        if (!data.latitude || !data.longitude) {
            throw new BadRequestError("Location data is required for mark attendance")
        }

        if (gym.location && (gym.location.latitude !== 0 || gym.location.longitude !== 0)) {
            const isNearby = isWithin50Km(
                data.latitude,
                data.longitude,
                gym.location.latitude,
                gym.location.longitude
            );

            if (!isNearby) {
                throw new BadRequestError("Access Denied. You must be at the gym location")
            }
        }

        let attendance = await this._attendanceRepository.findByUserAndDate(data.userId, startOfDay)

        if (data.action === "CHECK_IN") {
            if (attendance) {
                const lastLog = attendance.logs[attendance.logs.length - 1];
                if (lastLog && !lastLog.checkOut) {
                    throw new BadRequestError("You are already checked in. Please check out first")
                }
                attendance.logs.push({ checkIn: today });

                const updatedAttendance = new Attendance(
                    attendance.id,
                    attendance.userId,
                    attendance.gymId,
                    attendance.date,
                    attendance.logs,
                    "PRESENT",
                    attendance.userType,
                    attendance.isDeleted
                )
                await this._attendanceRepository.update(updatedAttendance);
                attendance = updatedAttendance;
            } else {
                const newAttendance = new Attendance(
                    "",
                    data.userId,
                    data.gymId,
                    startOfDay,
                    [{ checkIn: today }],
                    "PRESENT",
                    data.userType
                )
                const created = await this._attendanceRepository.create(newAttendance);
                attendance = created;

            }
        } else if (data.action === "CHECK_OUT") {
            if (!attendance) {
                throw new BadRequestError("No attendance record found for today.Please check in first")
            }

            const lastLog = attendance.logs[attendance.logs.length - 1];
            if (!lastLog || lastLog.checkOut) {
                throw new BadRequestError("You are already checked out or haven't checked in yet")
            }

            /**
             * duration check -30 minutes
             */
            const checkInTime = new Date(lastLog.checkIn).getTime();
            const currentTime = today.getTime();
            const minutesElapsed = (currentTime - checkInTime) / (1000 * 60);

            if (minutesElapsed < 30) {
                const remaining = Math.ceil(30 - minutesElapsed);
                throw new BadRequestError(`Minimum session duration is 30 minutes. Please try again in ${remaining} minute(s).`);
            }

            lastLog.checkOut = today;
            await this._attendanceRepository.update(attendance);
        }

        this._socketService.emitToGym(data.gymId, "attendanceUpdated", {
            userId: data.userId,
            status: attendance?.status
        })

        return {
            id: attendance!.id,
            userId: attendance!.userId,
            date: attendance!.date.toISOString(),
            logs: attendance!.logs.map(log => ({
                checkIn: log.checkIn.toISOString(),
                checkOut: log.checkOut?.toISOString()
            })),
            status: attendance!.status,
            userType: attendance!.userType
        }
    }
}