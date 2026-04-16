export class Session {
    constructor(
        public readonly id: string,
        public readonly userId: string,
        public readonly role: string,
        public readonly device: string,
        public readonly browser: string,
        public readonly os: string,
        public readonly ip: string,
        public readonly lastActive: Date,
        public readonly expiredAt: Date,
        public readonly createdAt: Date,
        public readonly isRevoked: boolean = false,
        public readonly gymId?: string
    ) { }
}


