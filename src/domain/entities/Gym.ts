import { ROLES } from "../../constants/roles.constants";


export class Gym {
    constructor(
        public readonly id: string,
        public readonly email: string,
        public readonly password: string,
        public readonly role: string = ROLES.GYM,
        public readonly logoUrl?: string,
        public readonly gymName?: string,
        public readonly caption?: string,
        public readonly phoneNumber?: string,
        public readonly address?: string,
        public readonly description?: string,
        public readonly location?: { latitude: number, longitude: number }
    ) { }
}

