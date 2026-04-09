import { Schema } from "mongoose";
import { IMessageDocument } from "../types/IMessageDocument";

export const MessageSchema = new Schema<IMessageDocument>({
    conversationId: {
        type: String,
        required: true,
        index: true
    },
    senderId: {
        type: String,
        required: true,
        index: true
    },
    receiverId: {
        type: String,
        required: true,
        index: true
    },
    content: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ["text", "image", "call"],
        default: "text"
    },
    isRead: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });
