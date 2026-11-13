

export interface LoginRequestDTO {
    email: string,
    password: string,
    device?: string,
    browser?: string,
    os?: string,
    ip?: string
}

export interface LoginResponseDTO {
    accessToken: string;
    refreshToken: string;
    email: string;
    role: string;
    id: string;
    gymId?: string;
}