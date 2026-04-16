import { Document } from "mongoose";
import { IDayPlan } from "../../../../domain/entities/WorkoutPlan";

export interface IExercise {
    id: string;
    name: string;
    reps: string;
    sets: string;
}

// export interface IDayPlan {
//     day: string;
//     exercises: IExercise[];
// }

export interface IWorkoutPlanDocument extends Document {
    clientId: string;
    trainerId: string;
    gymId: string;
    weeklyPlan: IDayPlan[];
    weekStartDate: Date;
    notes: string;
    createdAt: Date;
    updatedAt: Date;
}