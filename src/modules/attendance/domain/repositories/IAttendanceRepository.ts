import { Attendance } from "../../domain/entities/Attendance";
import { IBaseRepository } from "../../../../shared/database/BaseRepository";

export interface IAttendanceRepository extends IBaseRepository<Attendance> {
    findByUserAndDate(userId: string, date: Date): Promise<Attendance | null>;
    getDailyAttendance(gymId: string, date: Date, userType?: "CLIENT" | "TRAINER"): Promise<Attendance[]>;
    update(attendance: Attendance): Promise<Attendance>;
    countPresentDaysInYear(userId: string, year: number): Promise<number>;
}