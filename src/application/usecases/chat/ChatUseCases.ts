import { IChatRepository } from "../../../domain/repositories/IChatRepository";
import { IMessageDocument } from "../../../infrastructure/database/mongoose/types/IMessageDocument";
import { 
    IGetConversationsUseCase, 
    IGetMessagesUseCase, 
    ISendMessageUseCase, 
    IGetOrCreateConversationUseCase,
    IMarkMessagesAsReadUseCase,
    IDeleteMessageUseCase,
    IGetMessageByIdUseCase,
    IUploadChatAttachmentUseCase
} from "../../IUseCases/chat/IChatUseCases";
import { IS3Service } from "../../../domain/services/IS3Service";
import { AppError } from "../../errors/AppError";
import { HttpStatus } from "../../../constants/statusCodes.constants";
import { logger } from "../../../infrastructure/logger/logger";



export class GetConversationsUseCase implements IGetConversationsUseCase {
    constructor(private _chatRepository: IChatRepository) { }
    async execute(userId: string) {
        return await this._chatRepository.getConversations(userId);
    }
}

export class GetMessagesUseCase implements IGetMessagesUseCase {
    constructor(private _chatRepository: IChatRepository) { }
    async execute(conversationId: string) {
        return await this._chatRepository.getMessages(conversationId);
    }
}

export class SendMessageUseCase implements ISendMessageUseCase {
    constructor(private _chatRepository: IChatRepository) { }
    async execute(data: Partial<IMessageDocument>) {
        return await this._chatRepository.sendMessage(data);
    }
}

export class GetOrCreateConversationUseCase implements IGetOrCreateConversationUseCase {
    constructor(private _chatRepository: IChatRepository) { }
    async execute(participants: string[]) {
        return await this._chatRepository.getOrCreateConversation(participants);
    }
}

export class MarkMessagesAsReadUseCase implements IMarkMessagesAsReadUseCase {
    constructor(private _chatRepository: IChatRepository) { }
    async execute(conversationId: string, userId: string) {
        return await this._chatRepository.markMessagesAsRead(conversationId, userId);
    }
}

export class DeleteMessageUseCase implements IDeleteMessageUseCase {
    constructor(
        private _chatRepository: IChatRepository,
        private _s3Service: IS3Service
    ) { }

    async execute(messageId: string, userId: string): Promise<IMessageDocument> {
        const message = await this._chatRepository.getMessageById(messageId);
        if (!message) {
            throw new AppError("Message not found", HttpStatus.NOT_FOUND);
        }

        if (message.senderId !== userId) {
            throw new AppError("Only the sender can delete this message", HttpStatus.BAD_REQUEST);
        }

        // If it's an attachment, delete from S3
        if (message.type !== 'text' && message.type !== 'call') {
            try {
                await this._s3Service.deleteFile(message.content);
            } catch (s3Error) {
               logger.error("Failed to delete file from S3:", {error:s3Error});
            }
        }

        await this._chatRepository.deleteMessage(messageId);
        return message;
    }
}

export class UploadChatAttachmentUseCase implements IUploadChatAttachmentUseCase {
    constructor(private _s3Service: IS3Service) { }
    async execute(file: Express.Multer.File): Promise<string> {
        return await this._s3Service.uploadFile(file, "chat-attachments");
    }
}

export class GetMessageByIdUseCase implements IGetMessageByIdUseCase {
    constructor(private _chatRepository: IChatRepository) { }
    async execute(messageId: string) {
        return await this._chatRepository.getMessageById(messageId);
    }
}
