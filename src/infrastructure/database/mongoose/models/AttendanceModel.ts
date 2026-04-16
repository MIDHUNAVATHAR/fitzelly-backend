import { model } from "mongoose";
import { AttendanceSchema } from "../schemas/AttendanceSchema";
import { IAttendanceDocument } from "../types/IAttendanceDocument";

export const AttendanceModel = model<IAttendanceDocument>("Attendance", AttendanceSchema)