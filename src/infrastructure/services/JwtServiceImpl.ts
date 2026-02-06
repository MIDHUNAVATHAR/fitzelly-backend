import jwt from "jsonwebtoken"
import { ITokenService } from "../../domain/services/ITokenService"
import { JwtPayload } from "../../domain/services/ITokenService";


export class JwtServiceImpl implements ITokenService {
    generateAccessToken(payload: object): string {
        return jwt.sign(payload, process.env.JWT_ACCESS_SECRET!);
    }

    generateRefreshToken(payload: object): string {
        return jwt.sign(payload, process.env.JWT_REFRESH_SECRET!);
    }

    verifyRefrshToken(token: string): JwtPayload {

        try {
            const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET!);
            return decoded as JwtPayload

        } catch {
            throw new Error("expired refresh token")
        }

    }
    verifyAccessToken(token: string): JwtPayload {
        try {
            const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET!);
            return decoded as JwtPayload;
        } catch (error) {
            throw new Error("expired access token")
        }
    }
}