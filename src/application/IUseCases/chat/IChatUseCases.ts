import { IMessageDocument } from "../../../infrastructure/database/mongoose/types/IMessageDocument";
import { IConversationSummary } from "../../../domain/repositories/IChatRepository";

export interface IGetConversationsUseCase {
    execute(userId: string): Promise<IConversationSummary[]>;
}

export interface IGetMessagesUseCase {
    execute(conversationId: string): Promise<IMessageDocument[]>;
}

export interface ISendMessageUseCase {
    execute(data: Partial<IMessageDocument>): Promise<IMessageDocument>;
}

export interface IGetOrCreateConversationUseCase {
    execute(participants: string[]): Promise<IConversationSummary>;
}

export interface IMarkMessagesAsReadUseCase {
    execute(conversationId: string, userId: string): Promise<void>;
}

export interface IDeleteMessageUseCase {
    execute(messageId: string, userId: string): Promise<IMessageDocument>;
}

export interface IUploadChatAttachmentUseCase {
    execute(file: Express.Multer.File): Promise<string>;
}

export interface IGetMessageByIdUseCase {
    execute(messageId: string): Promise<IMessageDocument | null>;
}
