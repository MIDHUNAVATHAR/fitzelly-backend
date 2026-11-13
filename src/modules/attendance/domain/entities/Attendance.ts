export interface IAttendanceLog {
    checkIn: Date;
    checkOut?: Date;
}

export class Attendance {
    constructor(
        public readonly id: string,
        public readonly userId: string,
        public readonly gymId: string,
        public readonly date: Date,
        public readonly logs: IAttendanceLog[],
        public readonly status: "PENDING" | "PRESENT" | "ABSENT",
        public readonly userType: "CLIENT" | "TRAINER",
        public readonly isDeleted:boolean = false
    ) { }
}