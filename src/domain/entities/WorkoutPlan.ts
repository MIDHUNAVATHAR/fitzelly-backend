export interface IExercise {
    id: string;
    name: string;
    reps: string;
    sets: string;
}


export interface IDayPlan {
    day: string;
    exercises: IExercise[];
}

export class WorkoutPlan {
    constructor(
        public readonly id: string,
        public readonly clientId: string,
        public readonly trainerId: string,
        public readonly gymId: string,
        public readonly weeklyPlan: IDayPlan[],
        public readonly weekStartDate: Date = new Date(),
        public readonly notes: string = "",
        public readonly createdAt: Date = new Date(),
        public readonly updatedAt: Date = new Date()
    ) { }
}