
export interface TokenRefreshRequestDTO {
    refreshToken: string
}

export interface TokenRefreshResponseDTO {
    accessToken: string;
    user: object;
}