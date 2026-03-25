export class Exercise {
    constructor(
        public readonly id: string,
        public readonly gymId: string | undefined,
        public readonly name: string,
        public readonly instructions: string,
        public readonly reps: string,
        public readonly sets: string,
        public readonly videoUrl?: string,
        public readonly isDeleted: boolean = false,
        public readonly createdAt: Date = new Date(),
        public readonly updatedAt: Date = new Date()
    ) { }
}
