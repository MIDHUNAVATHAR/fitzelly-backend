export interface ClientLoginRequestDTO {
    email: string;
    password: string;
    device?: string;
    browser?: string;
    os?: string;
    ip?: string;
}

export interface ClientLoginResponseDTO {
    accessToken: string;
    refreshToken: string;
    client: {
        id: string;
        email: string;
        role: string;
        gymId?: string;
        sessionId?: string;
    }
}