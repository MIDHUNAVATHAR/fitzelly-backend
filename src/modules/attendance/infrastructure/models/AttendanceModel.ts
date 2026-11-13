import { model } from "mongoose";
import { AttendanceSchema } from "../../../../shared/database/mongoose/schemas/AttendanceSchema";
import { IAttendanceDocument } from "../../../../shared/database/mongoose/types/IAttendanceDocument";

export const AttendanceModel = model<IAttendanceDocument>("Attendance", AttendanceSchema)