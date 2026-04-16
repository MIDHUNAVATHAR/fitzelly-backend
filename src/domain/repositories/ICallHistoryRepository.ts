import { ICallHistoryDocument } from "../../infrastructure/database/mongoose/types/ICallHistoryDocument";

export interface ICallHistoryWithUser {
    callerId: string;
    receiverId: string;
    conversationId: string;
    type: 'audio' | 'video';
    status: 'completed' | 'missed' | 'rejected';
    duration: number;
    startTime: Date;
    endTime: Date;
    otherUser: { name: string; avatar: string } | null;
}

export interface ICallHistoryRepository {
    saveCallHistory(data: Partial<ICallHistoryDocument>): Promise<ICallHistoryDocument>;
    getCallHistoryByUserId(userId: string): Promise<ICallHistoryWithUser[]>;
    getCallHistoryByConversationId(conversationId: string): Promise<ICallHistoryDocument[]>;
}
