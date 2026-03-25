export interface CreateExerciseDTO {
    gymId?: string;
    name: string;
    instructions: string;
    reps: string;
    sets: string;
    videoFile?: any;
    videoUrl?: string;
}

export interface UpdateExerciseDTO extends Partial<CreateExerciseDTO> {
    id: string;
}

export interface ExerciseResponseDTO {
    id: string;
    gymId?: string;
    name: string;
    instructions: string;
    reps: string;
    sets: string;
    videoUrl?: string;
    createdAt: Date;
}
