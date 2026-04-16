export interface JwtPayload {
    id: string;
    email: string;
    role: string;
    gymId?: string;
    sessionId?: string;
}

export interface ITokenService {
    generateAccessToken(payload: object): string;
    generateRefreshToken(payload: object): string;
    verifyRefreshToken(token: string): JwtPayload;
    verifyAccessToken(token: string): JwtPayload;
}