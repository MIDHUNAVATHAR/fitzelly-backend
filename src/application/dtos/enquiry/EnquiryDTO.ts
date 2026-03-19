export interface CreateEnquiryRequestDTO {
    fullName: string;
    phoneNumber: string;
    email?: string;
}

export interface UpdateEnquiryRequestDTO {
    fullName?: string;
    phoneNumber?: string;
    email?: string;
    status?: "PENDING" | "CONTACTED" | "CONVERTED";
}

export interface EnquiryResponseDTO {
    id: string;
    gymId: string;
    fullName: string;
    phoneNumber: string;
    email: string | null;
    status: "PENDING" | "CONTACTED" | "CONVERTED";
    date: string;
}
