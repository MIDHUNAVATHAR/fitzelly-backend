import { Attendance } from "../../domain/entities/Attendance";
import { IAttendanceRepository } from "../../domain/repositories/IAttendanceRepository";
import { IAttendanceDocument } from "../database/mongoose/types/IAttendanceDocument";
import { AttendanceModel } from "../database/mongoose/models/AttendanceModel";
import { BaseRepository } from "./BaseRepository";
import { AttendanceMapper } from "../mapper/AttendanceMapper";


export class AttendanceRepository extends BaseRepository<Attendance, IAttendanceDocument> implements IAttendanceRepository {
    constructor() {
        super(AttendanceModel);
    }

    protected toEntity(doc: IAttendanceDocument): Attendance {
        return AttendanceMapper.toEntity(doc);
    }

    protected toDocument(entity: Attendance): Partial<IAttendanceDocument> {
        return AttendanceMapper.toDocument(entity);
    }

    async findByUserAndDate(userId: string, date: Date): Promise<Attendance | null> {
        const startOfDay = new Date(date);
        startOfDay.setHours(0, 0, 0, 0);

        const doc = await AttendanceModel.findOne({
            userId,
            date: startOfDay,
            isDeleted: false
        });

        return doc ? this.toEntity(doc) : null;
    }

    async getDailyAttendance(gymId: string, date: Date, userType?: "CLIENT" | "TRAINER"): Promise<Attendance[]> {
        const startOfDay = new Date(date);
        startOfDay.setHours(0, 0, 0, 0);

        const filter = {
            gymId,
            date: startOfDay,
            isDeleted: false,
            userType: "CLIENT"
        }

        if (userType) {
            filter.userType = userType;
        }

        const docs = await AttendanceModel.find(filter);
        return docs.map(doc => this.toEntity(doc));
    }
}