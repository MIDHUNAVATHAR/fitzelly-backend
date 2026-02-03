import { ROLES } from "../../constants/roles.constants"

export class Gym {
    constructor(
        public readonly id: string,
        public readonly email: string,
        public readonly password: string,
        public readonly role: string = ROLES.GYM,
    ) { }
}