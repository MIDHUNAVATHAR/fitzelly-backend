export class Plan {
    constructor(
        private _id: string,
        private _gymId: string,
        private _planName: string,
        private _planType: "DAY_BASED" | "CATEGORY_BASED",
        private _validity: number,
        private _price: number,
        private _windowPeriod: number = 0,
        private _description: string = "",
        private _isDeleted: boolean = false
    ) { }

    get id(): string { return this._id };
    get gymId(): string { return this._gymId };
    get planName(): string { return this._planName };
    get planType(): "DAY_BASED" | "CATEGORY_BASED" { return this._planType }
    get validity(): number { return this._validity; }
    get price(): number { return this._price; }
    get windowPeriod(): number { return this._windowPeriod; }
    get description(): string { return this._description; }
    get isDeleted(): boolean { return this._isDeleted; }

    update(data: Partial<{
        planName: string;
        planType: "DAY_BASED" | "CATEGORY_BASED";
        validity: number;
        price: number;
        windowPeriod?: number;
        description?: string;
    }>) {
        if (data.planName !== undefined) {
            this._planName = data.planName;
        }
        if (data.planType !== undefined) {
            this._planType = data.planType
        }
        if (data.validity !== undefined) {
            this._validity = data.validity
        }
        if (data.price !== undefined) {
            this._price = data.price
        }
        if (data.windowPeriod !== undefined) {
            this._windowPeriod = data.windowPeriod
        }
        if (data.description !== undefined) {
            this._description = data.description
        }
    }

    delete() {
        this._isDeleted = true
    }
}