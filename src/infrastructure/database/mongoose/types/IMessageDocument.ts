import { Document } from "mongoose";

export interface IMessageDocument extends Document {
    conversationId: string;
    senderId: string;
    receiverId: string;
    content: string;
    type: "text" | "image" | "call";
    isRead: boolean;
    createdAt: Date;
    updatedAt: Date;
}
