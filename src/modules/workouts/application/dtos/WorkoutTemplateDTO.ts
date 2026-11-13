export interface CreateWorkoutTemplateDTO {
    gymId: string;
    trainerId: string;
    name: string;
    days: Array<{
        day: "Sunday" | "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday";
        exerciseIds: string[];
    }>;
}

export interface WorkoutTemplateResponseDTO {
    id: string;
    gymId: string;
    trainerId: string;
    name: string;
    days: Array<{
        day: string;
        exercises: Array<{
            id: string;
            name: string;
            description: string;
            reps: string;
            sets: string;
            videoUrl?: string;
        }>;
    }>;
    createdAt: Date;
}
