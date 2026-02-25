export interface ClientLoginRequestDTO {
    email: string;
    password: string;
}

export interface ClientLoginResponseDTO {
    accessToken: string;
    refreshToken: string;
    client: {
        id: string;
        email: string;
        role: string;
    }
}