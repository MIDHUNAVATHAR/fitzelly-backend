import { Document } from "mongoose";

export interface IWorkoutLogDocument extends Document {
    clientId: string;
    date: Date;
    completedExercises: string[];
    createdAt: Date;
    updatedAt: Date;
}