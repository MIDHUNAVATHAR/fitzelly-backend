import { ROLES } from "../../constants/roles.constants";

export class SuperAdmin {
    constructor(
        public readonly id: string,
        public readonly email: string,
        public readonly password: string,
        public readonly role = ROLES.SUPERADMIN

    ) { }
}