// import { Response, NextFunction } from "express";
// import { AuthRequest } from "../middlewares/protect";
// import { HttpStatus, ResponseStatus } from "../../constants/statusCodes.constants";
// import { IS3Service } from "../../domain/services/IS3Service";
// import { ResponseMessage } from "../../constants/response.constants";

// import { IGetClientProfileUseCase } from "../../application/IUseCases/client/IGetClientProfileUseCase";
// import { IUpdateClientProfileUseCase } from "../../application/IUseCases/client/IUpdateClientProfileUseCase";
// import { IUpdateClientProfileImageUseCase } from "../../application/IUseCases/client/IUploadClientProfileImageUseCase";
// import { IFetchClientLatestMembershipUseCase } from "../../application/IUseCases/client/IFetchClientLatestMembershipUseCase";

// export class ClientProfileController {
//     constructor(
//         private _getClientProfileUseCase: IGetClientProfileUseCase,
//         private _updateClientProfileUseCase: IUpdateClientProfileUseCase,
//         private _updateClientProfileImageUseCase: IUpdateClientProfileImageUseCase,
//         private _fetchClientLatestMembershipUseCase: IFetchClientLatestMembershipUseCase,
//         private _s3Service: IS3Service
//     ) { }

//     async getClientProfile(req: AuthRequest, res: Response, next: NextFunction) {
//         try {
//             const clientId = req.user!.id;
//             const profile = await this._getClientProfileUseCase.execute(clientId);
//             return res.status(HttpStatus.OK).json({
//                 status: ResponseStatus.SUCCESS,
//                 message: ResponseMessage.DATA_RETRIVE_SUCCESS,
//                 data: { ...profile }
//             });
//         } catch (error) {
//             next(error);
//         }
//     }

//     async updateClientProfile(req: AuthRequest, res: Response, next: NextFunction) {
//         try {
//             const clientId = req.user!.id;
//             const updatedProfile = await this._updateClientProfileUseCase.execute(clientId, req.body);
//             return res.status(HttpStatus.OK).json({
//                 status: ResponseStatus.SUCCESS,
//                 message: ResponseMessage.DATA_UPDATE_SUCCESS,
//                 data: { ...updatedProfile }
//             });
//         } catch (error) {
//             next(error);
//         }
//     }

//     async uploadClientProfileImage(req: AuthRequest, res: Response, next: NextFunction) {
//         try {
//             const clientId = req.user!.id;
//             if (!req.file) {
//                 throw Error("File required");
//             }
//             const logoUrl = await this._s3Service.uploadFile(req.file);

//             const updatedProfile = await this._updateClientProfileImageUseCase.execute(clientId, logoUrl);
//             return res.status(HttpStatus.OK).json({
//                 status: ResponseStatus.SUCCESS,
//                 message: ResponseMessage.LOGO_UPDATE_SUCCESS,
//                 data: { profileImage: updatedProfile.profileImage }
//             });
//         } catch (error) {
//             next(error);
//         }
//     }

//     async getClientMembership(req: AuthRequest, res: Response, next: NextFunction) {
//         try {
//             const clientId = req.user!.id;
//             const membership = await this._fetchClientLatestMembershipUseCase.execute(clientId);

//             if (!membership) {
//                 return res.status(HttpStatus.NOT_FOUND).json({
//                     status: ResponseStatus.FAIL,
//                     message: "Membership not found for client",
//                     data: null
//                 });
//             }

//             return res.status(HttpStatus.OK).json({
//                 status: ResponseStatus.SUCCESS,
//                 message: ResponseMessage.DATA_RETRIVE_SUCCESS,
//                 data: { ...membership }
//             });
//         } catch (error) {
//             next(error);
//         }
//     }
// }
