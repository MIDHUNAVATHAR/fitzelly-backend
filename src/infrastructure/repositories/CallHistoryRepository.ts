import { ICallHistoryRepository, ICallHistoryWithUser } from "../../domain/repositories/ICallHistoryRepository";
import { CallHistoryModel } from "../database/mongoose/models/CallHistoryModel";
import { ICallHistoryDocument } from "../database/mongoose/types/ICallHistoryDocument";
import { GymModel } from "../database/mongoose/models/GymModel";
import { clientModel } from "../database/mongoose/models/ClientModel";
import { TrainerModel } from "../database/mongoose/models/TrainerModel";

export class CallHistoryRepository implements ICallHistoryRepository {
    async saveCallHistory(data: Partial<ICallHistoryDocument>): Promise<ICallHistoryDocument> {
        return await CallHistoryModel.create(data);
    }

    async getCallHistoryByUserId(userId: string): Promise<ICallHistoryWithUser[]> {
        const history = await CallHistoryModel.find({
            $or: [{ callerId: userId }, { receiverId: userId }]
        }).sort({ createdAt: -1 });

        return await Promise.all(history.map(async (item) => {
            const otherParticipantId = item.callerId === userId ? item.receiverId : item.callerId;
            
            let otherUser: { gymName?: string; fullName?: string; logoUrl?: string; profileUrl?: string } | null = null;
            otherUser = await GymModel.findById(otherParticipantId).select('gymName logoUrl').lean();
            if (!otherUser) {
                otherUser = await clientModel.findById(otherParticipantId).select('fullName profileUrl').lean();
            }
            if (!otherUser) {
                otherUser = await TrainerModel.findById(otherParticipantId).select('fullName profileUrl').lean();
            }

            return {
                ...item.toObject(),
                otherUser: otherUser ? {
                    name: otherUser.gymName || otherUser.fullName || "User",
                    avatar: otherUser.logoUrl || otherUser.profileUrl || ""
                } : null
            };
        }));
    }

    async getCallHistoryByConversationId(conversationId: string): Promise<ICallHistoryDocument[]> {
        return await CallHistoryModel.find({ conversationId }).sort({ createdAt: -1 });
    }
}
