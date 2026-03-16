export interface IExerciseDTO {
    id: string;
    name: string;
    reps: string;
    sets: string;
}

export interface IDayPlanDTO {
    day: string;
    exercises: IExerciseDTO[];
}

export interface WorkoutPlanDTO {
    id?: string;
    clientId: string;
    trainerId: string;
    gymId: string;
    weeklyPlan: IDayPlanDTO[];
    weekStartDate?: Date;
    notes?: string;
}

export interface WorkoutProgressDTO {
    date: string;
    completedExercises: string[];
}
