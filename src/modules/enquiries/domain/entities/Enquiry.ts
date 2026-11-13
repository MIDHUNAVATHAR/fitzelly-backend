
export class Enquiry {
    constructor(
        public readonly id: string,
        public readonly gymId: string,
        public readonly fullName: string,
        public readonly phoneNumber: string,
        public readonly email: string | null,
        public readonly status: "PENDING" | "CONTACTED" | "CONVERTED" = "PENDING",
        public readonly date: Date = new Date(),
        public readonly isDeleted: boolean = false
    ) { }
}
