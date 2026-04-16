import { Response, NextFunction } from "express";
import { AuthRequest } from "../../middlewares/protect";
import { 
    GetConversationsUseCase, 
    GetMessagesUseCase, 
    SendMessageUseCase, 
    GetOrCreateConversationUseCase,
    MarkMessagesAsReadUseCase,
    DeleteMessageUseCase,
    GetMessageByIdUseCase
} from "../../../application/usecases/chat/ChatUseCases";
import { HttpStatus, ResponseStatus } from "../../../constants/statusCodes.constants";
import { IS3Service } from "../../../domain/services/IS3Service";
import { BadRequestError } from "../../../application/errors/AppError";
import { SocketService } from "../../../infrastructure/services/SocketService";

export class ChatController {
    constructor(
        private getConversationsUseCase: GetConversationsUseCase,
        private getMessagesUseCase: GetMessagesUseCase,
        private sendMessageUseCase: SendMessageUseCase,
        private getOrCreateConversationUseCase: GetOrCreateConversationUseCase,
        private markMessagesAsReadUseCase: MarkMessagesAsReadUseCase,
        private deleteMessageUseCase: DeleteMessageUseCase,
        private getMessageByIdUseCase: GetMessageByIdUseCase,
        private s3Service: IS3Service
    ) { }

    async getConversations(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            const userId = req.user!.id;
            const conversations = await this.getConversationsUseCase.execute(userId);
            res.status(HttpStatus.OK).json({ status: ResponseStatus.SUCCESS, data: conversations });
        } catch (error) {
            next(error);
        }
    }

    async getMessages(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            const { conversationId } = req.params;
            const messages = await this.getMessagesUseCase.execute(conversationId as string);
            res.status(HttpStatus.OK).json({ status: ResponseStatus.SUCCESS, data: messages });
        } catch (error) {
            next(error);
        }
    }

    async sendMessage(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            const messageData = req.body;
            messageData.senderId = req.user!.id; // Force senderId from auth
            const message = await this.sendMessageUseCase.execute(messageData);
            res.status(HttpStatus.CREATED).json({ status: ResponseStatus.SUCCESS, data: message });
        } catch (error) {
            next(error);
        }
    }

    async getConversation(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            const { otherId } = req.params;
            const participants = [req.user!.id, otherId as string];
            const conversation = await this.getOrCreateConversationUseCase.execute(participants);
            res.status(HttpStatus.OK).json({ status: ResponseStatus.SUCCESS, data: conversation });
        } catch (error) {
            next(error);
        }
    }

    async markAsRead(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            const { conversationId } = req.params;
            const userId = req.user!.id;
            await this.markMessagesAsReadUseCase.execute(conversationId as string, userId);
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

            const url = await this.s3Service.uploadFile(req.file as Express.Multer.File, "chat-attachments");
            res.status(HttpStatus.OK).json({ status: ResponseStatus.SUCCESS, data: { url } });
        } catch (error) {
            next(error);
        }
    }

    async deleteMessage(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            const { messageId } = req.params;
            const message = await this.getMessageByIdUseCase.execute(messageId as string);

            if (!message) {
                throw new BadRequestError("Message not found");
            }

            // Only sender can delete for everyone (per user requirement)
            if (message.senderId !== req.user!.id) {
                throw new BadRequestError("Only the sender can delete this message");
            }

            // If it's an attachment, delete from S3
            if (message.type !== 'text' && message.type !== 'call') {
                try {
                    await this.s3Service.deleteFile(message.content);
                } catch (s3Error) {
                    console.error("Failed to delete from S3:", s3Error);
                    // Continue deleting from DB even if S3 fails
                }
            }

            await this.deleteMessageUseCase.execute(messageId as string);

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
