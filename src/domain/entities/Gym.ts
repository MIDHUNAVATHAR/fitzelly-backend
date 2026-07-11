import { ROLES } from "../../constants/roles.constants";

export type ApprovalStatus = "Approved" | "Pending" | "Rejected" | "Reapplied";
export type SubscriptionStatus = "Active" | "Trial" | "Expired" | "Pending";

export interface IGymCertificate {
    url: string;
    type: 'IMAGE' | 'PDF';
    name: string;
    key: string;
}

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
        public readonly location?: { latitude: number, longitude: number },
        public readonly approvalStatus: ApprovalStatus = "Pending",
        public readonly expiryDate?: Date,
        public readonly rejectionReason?: string,
        public readonly certificates: IGymCertificate[] = [],
        public readonly createdAt: Date = new Date(),
    ) { }
}



