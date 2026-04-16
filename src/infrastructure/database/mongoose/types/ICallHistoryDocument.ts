import { Document } from "mongoose";

export interface ICallHistoryDocument extends Document {
    callerId: string;
    receiverId: string;
    conversationId: string;
    type: 'audio' | 'video';
    status: 'completed' | 'missed' | 'rejected';
    duration: number; // in seconds
    startTime: Date;
    endTime: Date;
}
