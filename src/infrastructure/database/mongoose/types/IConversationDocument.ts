import { Document } from "mongoose";

export interface IConversationDocument extends Document {
    participants: string[]; // [GymId/TrainerId, ClientId]
    lastMessage: string | null;
    createdAt: Date;
    updatedAt: Date;
}
