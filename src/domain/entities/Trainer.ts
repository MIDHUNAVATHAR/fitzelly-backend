
export class Trainer {
    constructor(
        public readonly id: string,
        public readonly gymId: string,
        public readonly email: string,
        public readonly password: string | null,
        public readonly profileUrl: string | null,
        public readonly fullName: string,
        public readonly phoneNumber: string,
        public readonly dateOfBirth: Date | null,
        public readonly salary: string | null,
        public readonly specialization: string,
        public readonly isEmailVerified: boolean = false,
        public readonly joinedDate: Date = new Date(),
        public readonly isDeleted: boolean = false
    ) { }
}