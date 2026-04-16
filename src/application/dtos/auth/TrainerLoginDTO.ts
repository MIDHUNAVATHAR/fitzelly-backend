export interface TrainerLoginRequestDTO {
    email: string;
    password: string;
    device?: string;
    browser?: string;
    os?: string;
    ip?: string;
}

export interface TrainerLoginResponseDTO {
    accessToken: string;
    refreshToken: string;
    trainer: {
        id: string;
        email: string;
        role: string;
        gymId: string;
        sessionId?: string;
    };
}