import { IDayPlan } from "../../../domain/entities/WorkoutPlan";

export interface IExerciseDTO {
    id: string;
    name: string;
    reps: string;
    sets: string;
}


export interface WorkoutPlanDTO {
    id?: string;
    clientId: string;
    trainerId: string;
    gymId: string;
    weeklyPlan: IDayPlan[];
    weekStartDate?: Date;
    notes?: string;
}

export interface WorkoutProgressDTO {
    date: string;
    completedExercises: string[];
}
