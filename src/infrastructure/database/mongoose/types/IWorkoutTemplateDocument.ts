import { Document, Types } from "mongoose";

export interface IWorkoutTemplateDocument extends Document {
    gymId: string;
    trainerId: string;
    name: string;
    days: Array<{
        day: "Sunday" | "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday";
        exercises: Types.ObjectId[];
    }>;
    createdAt: Date;
    updatedAt: Date;
}
