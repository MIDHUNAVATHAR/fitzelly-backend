import { Response, NextFunction } from "express";
import { IAddClientUseCase } from "../../../application/IUseCases/gym-client/IAddClientUseCase";
import { IGetClientsUseCase } from "../../../application/IUseCases/gym-client/IGetClientsUseCase";
import { IGetClientByIdUseCase } from "../../../application/IUseCases/gym-client/IGetClientByIdUseCase";
import { IUpdateClientByGymUseCase } from "../../../application/IUseCases/gym-client/IUpdateClientUseCase";
import { IDeleteClientUseCase } from "../../../application/IUseCases/gym-client/IDeleteClientUseCase";
import { ISendWelcomeEmailUseCase } from "../../../application/IUseCases/invite/ISendWelcomeEmailUseCase";
import { AuthRequest } from "../../middlewares/protect";
import { HttpStatus, ResponseStatus } from "../../../constants/statusCodes.constants";
import { ResponseMessage } from "../../../constants/response.constants";


export class GymClientController {
    constructor(
        private _addClientUseCase: IAddClientUseCase,
        private _getClientsUseCase: IGetClientsUseCase,
        private _getClientByIdUseCase: IGetClientByIdUseCase,
        private _updateClientByGymUseCase: IUpdateClientByGymUseCase,
        private _deleteClientUseCase: IDeleteClientUseCase,
        private _sendWelcomeEmailUseCase: ISendWelcomeEmailUseCase
    ) { }

    async addClient(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            const user = req.user;
            if (!user) {
                return res.status(HttpStatus.UNAUTHORIZED).json({
                    status: ResponseStatus.FAIL,
                    message: ResponseMessage.ACCESS_TOKEN_MISSING
                });
            }

            const gymId = user.id;

            const { fullName, email, phoneNumber, dateOfBirth, emergencyContact, contactPerson } = req.body;

            await this._addClientUseCase.execute({
                gymId,
                fullName, email, phoneNumber, dateOfBirth, emergencyContact, contactPerson
            })

            res.status(HttpStatus.OK).json({
                status: ResponseStatus.SUCCESS,
                message: ResponseMessage.CLIENT_ADD_SUCCESS
            })

        } catch (error) {
            next(error)
        }
    }

    async getClients(req: AuthRequest, res: Response, next: NextFunction) {
        try {

            const user = req.user;
            if (!user) {
                return res.status(HttpStatus.UNAUTHORIZED).json({
                    status: ResponseStatus.FAIL,
                    message: ResponseMessage.ACCESS_TOKEN_MISSING
                });
            }

            const gymId = user.id;

            const page = Number(req.query.page) || 1;
            const search = (req.query.search as string) || "";

            const result = await this._getClientsUseCase.execute(gymId, page, search);

            return res.status(HttpStatus.OK).json({
                status: ResponseStatus.SUCCESS,
                message: ResponseMessage.GET_CLIENTS_SUCCESS,
                data: {
                    clients: result.clients, pagination:
                        { total: result.total, page: result.page, limit: result.limit }
                }
            })


        } catch (error) {
            next(error)
        }
    }

    async getClientById(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            const clientId = req.params.id as string;

            const client = await this._getClientByIdUseCase.execute(clientId);
            res.status(HttpStatus.OK).json({
                status: ResponseStatus.SUCCESS,
                message: ResponseMessage.GET_CLIENT_SUCCESS,
                data: { ...client }
            })

        } catch (error) {
            next(error)
        }
    }

    async updateClient(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            const clientId = req.params.id as string;

            const { fullName, phoneNumber, dateOfBirth, emergencyContact, contactPerson, email } = req.body;
            const updatedClient = await this._updateClientByGymUseCase.execute(clientId, {
                fullName, phoneNumber, dateOfBirth, emergencyContact, contactPerson, email
            });

            res.status(HttpStatus.OK).json({
                status: ResponseStatus.SUCCESS,
                message: ResponseMessage.CLIENT_UPDATE_SUCCESS,
                data: { ...updatedClient }
            })

        } catch (error) {
            next(error)
        }
    }

    async DeleteClientUseCase(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            const user = req.user;

            if (!user) {
                return res.status(HttpStatus.UNAUTHORIZED).json({
                    status: ResponseStatus.FAIL,
                    message: ResponseMessage.ACCESS_TOKEN_MISSING
                });
            }

            const gymId = user.id;

            const clientId = req.params.id as string;
            await this._deleteClientUseCase.execute(clientId, gymId);

            res.status(HttpStatus.OK).json({
                status: ResponseStatus.SUCCESS,
                message: ResponseMessage.CLIENT_DELETE_SUCCESS
            })
        } catch (error) {
            next(error);
        }
    }

    async sendWelcomeEmail(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            const user = req.user;
            if (!user) {
                return res.status(HttpStatus.UNAUTHORIZED).json({
                    status: ResponseStatus.FAIL,
                    message: ResponseMessage.ACCESS_TOKEN_MISSING
                });
            }

            const gymId = user.id;


            const clientId = req.params.id as string;


            await this._sendWelcomeEmailUseCase.execute({ userId: clientId, gymId, role: "client" });

            res.status(HttpStatus.OK).json({
                status: ResponseStatus.SUCCESS,
                message: ResponseMessage.WELCOME_MAIL_SUCCESS
            })
        } catch (error) {
            next(error)
        }
    }
}