import jwt from "jsonwebtoken"
import { ITokenService } from "../../domain/services/ITokenService"
import { JwtPayload } from "../../domain/services/ITokenService";
import { InvalidTokenError } from "../../domain/errors/InvalidTokenError";


export class JwtService implements ITokenService {
    generateAccessToken(payload: object): string {
        return jwt.sign(payload, process.env.JWT_ACCESS_SECRET!, { expiresIn: Number(process.env.ACCESS_MAX_AGE) });
    }

    generateRefreshToken(payload: object): string {
        return jwt.sign(payload, process.env.JWT_REFRESH_SECRET!, { expiresIn: Number(process.env.REFRESH_MAX_AGE) });
    }

    verifyRefreshToken(token: string): JwtPayload {

        try {
            const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET!);
            return decoded as JwtPayload

        } catch {
            throw new InvalidTokenError("refresh")
        }

    }
    verifyAccessToken(token: string): JwtPayload {
        try {
            const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET!);
            return decoded as JwtPayload;
        } catch {
            throw new InvalidTokenError("access")
        }
    }
}