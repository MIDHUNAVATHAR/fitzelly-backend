import { Schema } from "mongoose";
import { ICallHistoryDocument } from "../types/ICallHistoryDocument";

export const CallHistorySchema = new Schema<ICallHistoryDocument>({
    callerId: {
        type: String,
        required: true,
        index: true
    },
    receiverId: {
        type: String,
        required: true,
        index: true
    },
    conversationId: {
        type: String,
        required: true,
        index: true
    },
    type: {
        type: String,
        enum: ['audio', 'video'],
        required: true
    },
    status: {
        type: String,
        enum: ['completed', 'missed', 'rejected'],
        required: true
    },
    duration: {
        type: Number,
        default: 0
    },
    startTime: {
        type: Date,
        required: true
    },
    endTime: {
        type: Date,
        required: true
    }
}, { timestamps: true });
