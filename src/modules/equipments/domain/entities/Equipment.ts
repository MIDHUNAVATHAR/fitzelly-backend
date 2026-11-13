export class Equipment {
    constructor(
        private _id: string,
        private _gymId: string,
        private _name: string,
        private _description: string,
        private _image: string,
        private _availableDays: string[],
        private _availableFrom: string,
        private _availableTo: string,
        private _allowedPlans: string[],
        private _capacity: number,
        private _slotIntervalMinutes: number,
        private _isActive: boolean = true,
        private _isDeleted: boolean = false
    ) { }

    get id(): string { return this._id; }
    get gymId(): string { return this._gymId; }
    get name(): string { return this._name; }
    get description(): string { return this._description; }
    get image(): string { return this._image; }
    get availableDays(): string[] { return this._availableDays; }
    get availableFrom(): string { return this._availableFrom; }
    get availableTo(): string { return this._availableTo; }
    get allowedPlans(): string[] { return this._allowedPlans; }
    get capacity(): number { return this._capacity; }
    get slotIntervalMinutes(): number { return this._slotIntervalMinutes; }
    get isActive(): boolean { return this._isActive; }
    get isDeleted(): boolean { return this._isDeleted; }

    update(data: Partial<{
        name: string;
        description: string;
        image: string;
        availableDays: string[];
        availableFrom: string;
        availableTo: string;
        allowedPlans: string[];
        capacity: number;
        slotIntervalMinutes: number;
        isActive: boolean;
    }>) {
        if (data.name !== undefined) this._name = data.name;
        if (data.description !== undefined) this._description = data.description;
        if (data.image !== undefined) this._image = data.image;
        if (data.availableDays !== undefined) this._availableDays = data.availableDays;
        if (data.availableFrom !== undefined) this._availableFrom = data.availableFrom;
        if (data.availableTo !== undefined) this._availableTo = data.availableTo;
        if (data.allowedPlans !== undefined) this._allowedPlans = data.allowedPlans;
        if (data.capacity !== undefined) this._capacity = data.capacity;
        if (data.slotIntervalMinutes !== undefined) this._slotIntervalMinutes = data.slotIntervalMinutes;
        if (data.isActive !== undefined) this._isActive = data.isActive;
    }

    delete() {
        this._isDeleted = true;
    }
}
