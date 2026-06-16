import { Request, Response, NextFunction } from "express";
import { ICreatePasswordUseCase } from "../../../application/IUseCases/auth/ICreatePasswordUseCase";
import { HttpStatus, ResponseStatus } from "../../../constants/statusCodes.constants";
import { ResponseMessage } from "../../../constants/response.constants";


export class InviteController {
    constructor(
        private _createPasswordUseCase: ICreatePasswordUseCase
    ) { }

    async createPassword(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { userType, userId, otp, password } = req.body;
            await this._createPasswordUseCase.execute({
                userType,
                userId,
                otp,
                password
            })

            res.status(HttpStatus.OK).json({
                status: ResponseStatus.SUCCESS,
                message: ResponseMessage.PASSWORD_CREATE_SUCCESS
            })
        } catch (error) {
            next(error)
        }
    }
}