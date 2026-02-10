import { Request, Response, NextFunction } from "express";
import { JwtServiceImpl } from "../../infrastructure/services/JwtServiceImpl";
import { HttpStatus, ResponseStatus } from "../../constants/statusCodes.constants";


const jwtService = new JwtServiceImpl();

export interface AuthRequest extends Request {
    user?: { id: string, role: string, email: string }
}

export const protect = (roles: string[]) => (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(HttpStatus.UNAUTHORIZED).json({
                status: ResponseStatus.FAIL,
                message: "Access token missing"
            })
        }

        const token = authHeader.split(" ")[1];
        const payload = jwtService.verifyAccessToken(token);

        if (roles.length > 0 && !roles.includes(payload.role)) {
            return res.status(HttpStatus.FORBIDDEN).json({
                status: ResponseStatus.FAIL,
                message: "you are not allowed to access this resource"
            })
        }

        req.user = payload;
        next();

    } catch {
        return res.status(HttpStatus.UNAUTHORIZED).json({
            status: ResponseStatus.ERROR,
            message: "Access token invalid"
        })
    }
}