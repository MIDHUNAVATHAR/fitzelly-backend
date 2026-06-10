import { Response, NextFunction } from "express";
import { AuthRequest } from "../../middlewares/protect";
import { 
    IGetConversationsUseCase, 
    IGetMessagesUseCase, 
    ISendMessageUseCase, 
    IGetOrCreateConversationUseCase,
    IMarkMessagesAsReadUseCase,
    IDeleteMessageUseCase,
    IUploadChatAttachmentUseCase
} from "../../../application/IUseCases/chat/IChatUseCases";
import { HttpStatus, ResponseStatus } from "../../../constants/statusCodes.constants";
import { BadRequestError } from "../../../application/errors/AppError";
import { SocketService } from "../../../infrastructure/services/SocketService";

export class ChatController {
    constructor(
        private _getConversationsUseCase: IGetConversationsUseCase,
        private _getMessagesUseCase: IGetMessagesUseCase,
        private _sendMessageUseCase: ISendMessageUseCase,
        private _getOrCreateConversationUseCase: IGetOrCreateConversationUseCase,
        private _markMessagesAsReadUseCase: IMarkMessagesAsReadUseCase,
        private _deleteMessageUseCase: IDeleteMessageUseCase,
        private _uploadChatAttachmentUseCase: IUploadChatAttachmentUseCase
    ) { }

    async getConversations(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            const userId = req.user!.id;
            const conversations = await this._getConversationsUseCase.execute(userId);
            res.status(HttpStatus.OK).json({ status: ResponseStatus.SUCCESS, data: conversations });
        } catch (error) {
            next(error);
        }
    }

    async getMessages(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            const { conversationId } = req.params;
            const messages = await this._getMessagesUseCase.execute(conversationId as string);
            res.status(HttpStatus.OK).json({ status: ResponseStatus.SUCCESS, data: messages });
        } catch (error) {
            next(error);
        }
    }

    async sendMessage(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            const messageData = req.body;
            messageData.senderId = req.user!.id; // Force senderId from auth
            const message = await this._sendMessageUseCase.execute(messageData);
            res.status(HttpStatus.CREATED).json({ status: ResponseStatus.SUCCESS, data: message });
        } catch (error) {
            next(error);
        }
    }

    async getConversation(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            const { otherId } = req.params;
            const participants = [req.user!.id, otherId as string];
            const conversation = await this._getOrCreateConversationUseCase.execute(participants);
            res.status(HttpStatus.OK).json({ status: ResponseStatus.SUCCESS, data: conversation });
        } catch (error) {
            next(error);
        }
    }

    async markAsRead(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            const { conversationId } = req.params;
            const userId = req.user!.id;
            await this._markMessagesAsReadUseCase.execute(conversationId as string, userId);
            res.status(HttpStatus.OK).json({ status: ResponseStatus.SUCCESS });
        } catch (error) {
            next(error);
        }
    }

    async uploadAttachment(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            if (!req.file) {
                throw new BadRequestError("No file uploaded");
            }

            const url = await this._uploadChatAttachmentUseCase.execute(req.file);
            res.status(HttpStatus.OK).json({ status: ResponseStatus.SUCCESS, data: { url } });
        } catch (error) {
            next(error);
        }
    }

    async deleteMessage(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            const { messageId } = req.params;
            const userId = req.user!.id;

            const message = await this._deleteMessageUseCase.execute(messageId as string, userId);

            // Notify via socket - emit to both participants
            SocketService.io.to(`user_${message.senderId}`).to(`user_${message.receiverId}`).emit('MESSAGE_DELETED', { 
                messageId, 
                conversationId: message.conversationId 
            });

            res.status(HttpStatus.OK).json({ status: ResponseStatus.SUCCESS });
        } catch (error) {
            next(error);
        }
    }
}
