export class EquipmentBooking {
    constructor(
        private _id: string,
        private _clientId: string,
        private _gymId: string,
        private _equipmentId: string,
        private _date: Date,
        private _startTime: string,
        private _endTime: string,
        private _status: 'BOOKED' | 'CANCELLED' = 'BOOKED',
        private _createdAt: Date = new Date()
    ) { }

    get id(): string { return this._id; }
    get clientId(): string { return this._clientId; }
    get gymId(): string { return this._gymId; }
    get equipmentId(): string { return this._equipmentId; }
    get date(): Date { return this._date; }
    get startTime(): string { return this._startTime; }
    get endTime(): string { return this._endTime; }
    get status(): 'BOOKED' | 'CANCELLED' { return this._status; }
    get createdAt(): Date { return this._createdAt; }

    cancel() {
        this._status = 'CANCELLED';
    }
}
