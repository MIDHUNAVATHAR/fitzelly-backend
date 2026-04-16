import { IAttendanceDocument } from "../database/mongoose/types/IAttendanceDocument";
import { Attendance } from "../../domain/entities/Attendance";

export class AttendanceMapper {
    static toEntity(doc: IAttendanceDocument): Attendance {
        return new Attendance(
            doc._id.toString(),
            doc.userId,
            doc.gymId,
            doc.date,
            doc.logs.map(log => ({
                checkIn: log.checkIn,
                checkOut: log.checkOut
            })),
            doc.status,
            doc.userType,
            doc.isDeleted
        );
    }

    static toDocument(entity: Attendance): Partial<IAttendanceDocument> {
        return {
            userId: entity.userId,
            gymId: entity.gymId,
            date: entity.date,
            logs: entity.logs,
            status: entity.status,
            userType: entity.userType,
            isDeleted: entity.isDeleted
        };
    }
}
