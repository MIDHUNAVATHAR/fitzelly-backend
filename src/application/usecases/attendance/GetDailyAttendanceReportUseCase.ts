import { IAttendanceRepository } from "../../../domain/repositories/IAttendanceRepository";
import { IClientRepository } from "../../../domain/repositories/IClientRepository";
import { ITrainerRepository } from "../../../domain/repositories/ITrainerRepository";
import { DailyAttendanceReportDTO } from "../../dtos/attendance/AttendanceDTO";
import { IGetDailyAttendanceReportUseCase } from "../../IUseCases/attendance/IGetDailyAttendanceReportUseCase";


export class GetDailyAttendanceReportUseCase implements IGetDailyAttendanceReportUseCase {
    constructor(
        private _attendanceRepository: IAttendanceRepository,
        private _clientRepository: IClientRepository,
        private _trainerRepository: ITrainerRepository
    ) { }

    async execute(gymId: string, date: Date, userType: "CLIENT" | "TRAINER"): Promise<DailyAttendanceReportDTO[]> {
        const startOfDay = new Date(date);
        startOfDay.setHours(0, 0, 0, 0);

        /**
         * fetch all users of that type for the gym
         */
        let users: { id: string; fullName: string; email: string; clientId?: string | null }[] = [];
        if (userType === "CLIENT") {

            const result = await this._clientRepository.getClientsByGymId(gymId, 0, 1000);
            users = result.clients;
        } else {
            const result = await this._trainerRepository.getTrainersByGymId(gymId, 0, 1000);
            users = result.trainers;
        }

        /**
         * fetch all attendance records for that day and gym
         */
        const attendanceRecords = await this._attendanceRepository.getDailyAttendance(gymId, startOfDay, userType)

        /**
         * map them
         */
        const report: DailyAttendanceReportDTO[] = users.map(user => {
            const attendance = attendanceRecords.find(record => record.userId.toString() === user.id.toString());

            let checkIn = "--";
            let checkOut = "--";
            let status: 'PRESENT' | 'ABSENT' | 'PENDING' = "PENDING";

            if (attendance) {
                status = attendance.status as 'PRESENT' | 'ABSENT' | 'PENDING';
                if (attendance.logs && attendance.logs.length > 0) {
                    const firstLog = attendance.logs[0];
                    const lastLog = attendance.logs[attendance.logs.length - 1];

                    checkIn = firstLog.checkIn.toLocaleTimeString("en-US", { hour: "2-digit", minute: '2-digit', hour12: true })

                    if (lastLog.checkOut) {
                        checkOut = lastLog.checkOut.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true })
                    }
                }
            }

            return {
                userId: user.id,
                fullName: user.fullName || user.email, //fallback if name is missing
                clientId: userType === "CLIENT" ? (user.clientId ?? undefined) : undefined,
                checkIn,
                checkOut,
                status,
                userType,
                logs: attendance?.logs || []
            }
        })
        return report;
    }
}