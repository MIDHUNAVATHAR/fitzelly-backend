import { IMessageDocument } from "../../infrastructure/database/mongoose/types/IMessageDocument";

export interface IChatRepository {
    getConversations(userId: string): Promise<any[]>;
    getMessages(conversationId: string): Promise<IMessageDocument[]>;
    sendMessage(data: Partial<IMessageDocument>): Promise<IMessageDocument>;
    getOrCreateConversation(participants: string[]): Promise<any>;
    markMessagesAsRead(conversationId: string, userId: string): Promise<void>;
}
