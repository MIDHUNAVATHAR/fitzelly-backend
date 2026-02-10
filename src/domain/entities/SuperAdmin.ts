import { ROLES } from "../../constants/roles.constants";

export class SuperAdmin {
    constructor(
        public readonly id: string,
        public readonly email: string,
        public readonly password: string,
        public readonly role = ROLES.SUPERADMIN,
        public readonly logoUrl: string,
        public readonly appName: string,
        public readonly caption: string,
        public readonly contactEmail: string,
        public readonly phoneNumber: string,
        public readonly description: string
    ) { }
}