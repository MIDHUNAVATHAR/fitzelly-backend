import { Document } from "mongoose";

export interface IExerciseDocument extends Document {
    gymId?: string;
    name: string;
    instructions: string;
    reps: string;
    sets: string;
    videoUrl?: string;
    isDeleted: boolean;
    createdAt: Date;
    updatedAt: Date;
}
