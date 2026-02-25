export interface TrainerLoginRequestDTO {
    email: string;
    password: string;
}

export interface TrainerLoginResponseDTO {
    accessToken: string;
    refreshToken: string;
    trainer: {
        id: string;
        email: string;
        role: string;
    };
}