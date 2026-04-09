import { Schema } from "mongoose";
import { IConversationDocument } from "../types/IConversationDocument";

export const ConversationSchema = new Schema<IConversationDocument>({
    participants: {
        type: [String],
        required: true,
        index: true
    },
    lastMessage: {
        type: String,
        default: ""
    }
}, { timestamps: true });
