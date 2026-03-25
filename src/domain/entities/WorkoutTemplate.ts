export interface ITemplateDay {
    day: "Sunday" | "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday";
    exerciseIds: string[];
}

export class WorkoutTemplate {
    constructor(
        public readonly id: string,
        public readonly gymId: string,
        public readonly trainerId: string,
        public readonly name: string,
        public readonly days: ITemplateDay[],
        public readonly createdAt: Date = new Date(),
        public readonly updatedAt: Date = new Date()
    ) { }
}
