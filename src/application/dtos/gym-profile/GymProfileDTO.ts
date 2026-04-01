
export interface IGymCertificateDTO {
    url: string;
    type: 'IMAGE' | 'PDF';
    name: string;
    key: string;
}

export interface GymProfileDTO {
    logoUrl: string;
    gymName: string;
    caption: string;
    email: string;
    phoneNumber: string;
    address: string;
    description: string;
    location: { longitude: number, latitude: number }
    approvalStatus: string;
    subscriptionStatus: string;
    startDate?: Date;
    expiryDate: Date | "";
    paymentMethod?: string;
    planName?: string;
    amount?: number;
    certificates?: IGymCertificateDTO[];
    rejectionReason?: string;
}
