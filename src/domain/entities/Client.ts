
export class Client {
    constructor(
        public readonly id: string,
        public readonly gymId: string,
        public readonly email: string,
        public readonly password: string | null,
        public readonly profileUrl: string | null,
        public readonly fullName: string,
        public readonly phoneNumber: string | null,
        public readonly dateOfBirth: Date | null,
        public readonly emergencyContact: string | null,
        public readonly contactPerson: string | null,
        public readonly currentPlan: string | null,
        public readonly membershipStatus: "Active" | "Expired" | "Pending",
        public readonly isEmailVerified: boolean = false,
        public readonly joinedDate: Date = new Date(),
        public readonly isDeleted: boolean = false
    ) { }
}

