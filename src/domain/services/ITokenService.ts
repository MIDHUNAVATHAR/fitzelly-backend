
export interface JwtPayload {
    id: string;
    email: string;
    role: string;
}

export interface ITokenService {
    generateAccessToken(payload: object): string;
    generateRefreshToken(payload: object): string;
    verifyRefrshToken(token: string): JwtPayload
}