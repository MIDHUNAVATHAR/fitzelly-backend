

export interface LoginRequestDTO {
    email: string,
    password: string
}

export interface LoginResponseDTO {
    accessToken: string;
    refreshToken: string;
    email: string;
    role: string;
    id: string;
}