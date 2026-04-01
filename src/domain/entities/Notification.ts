export class Notification {
    constructor(
        public readonly id: string,
        public gymId: string,
        public message: string,
        public isRead: boolean,
        public type: string,
        public createdAt: Date,
        public targetRole: string = 'GYM',
    ) {}
}
