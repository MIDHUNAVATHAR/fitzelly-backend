import { IMessageDocument } from "../../infrastructure/database/mongoose/types/IMessageDocument";

export interface IOtherUser {
    id: string;
    name: string;
    avatar: string;
}

export interface IConversationSummary {
    id: unknown;
    participants: string[];
    lastMessage: string | null | undefined;
    updatedAt: Date;
    otherUser: IOtherUser | null;
}

export interface IChatRepository {
    getConversations(userId: string): Promise<IConversationSummary[]>;
    getMessages(conversationId: string): Promise<IMessageDocument[]>;
    sendMessage(data: Partial<IMessageDocument>): Promise<IMessageDocument>;
    getOrCreateConversation(participants: string[]): Promise<IConversationSummary>;
    markMessagesAsRead(conversationId: string, userId: string): Promise<void>;
    deleteMessage(messageId: string): Promise<void>;
    getMessageById(messageId: string): Promise<IMessageDocument | null>;
}
