import { Response, NextFunction } from "express";
import { AuthRequest } from "../../middlewares/protect";
import { 
    GetConversationsUseCase, 
    GetMessagesUseCase, 
    SendMessageUseCase, 
    GetOrCreateConversationUseCase,
    MarkMessagesAsReadUseCase
} from "../../../application/usecases/chat/ChatUseCases";
import { HttpStatus, ResponseStatus } from "../../../constants/statusCodes.constants";

export class ChatController {
    constructor(
        private getConversationsUseCase: GetConversationsUseCase,
        private getMessagesUseCase: GetMessagesUseCase,
        private sendMessageUseCase: SendMessageUseCase,
        private getOrCreateConversationUseCase: GetOrCreateConversationUseCase,
        private markMessagesAsReadUseCase: MarkMessagesAsReadUseCase
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
}
