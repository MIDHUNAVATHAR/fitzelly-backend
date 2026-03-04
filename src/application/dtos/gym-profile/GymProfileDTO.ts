
export interface GymProfileDTO {
    logoUrl: string;
    gymName: string;
    caption: string;
    email: string;
    phoneNumber: string;
    address: string;
    description: string;
    location: { longitude: number, latitude: number }
    approvalStatus: string,
    subscriptionStatus: string,
    expiryDate: Date | ""
}




