import { Attendance } from "../entities/Attendance";
import { IBaseRepository } from "./IBaseRepository";


export interface IAttendanceRepository extends IBaseRepository<Attendance> {
    findByUserAndDate(userId: string, date: Date): Promise<Attendance | null>;
    getDailyAttendance(gymId: string, date: Date, userType?: "CLIENT" | "TRAINER"): Promise<Attendance[]>;
    update(attendance: Attendance): Promise<Attendance>;
}