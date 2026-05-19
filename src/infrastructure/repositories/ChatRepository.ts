import { IChatRepository, IConversationSummary } from "../../domain/repositories/IChatRepository";
import { ConversationModel } from "../database/mongoose/models/ConversationModel";
import { MessageModel } from "../database/mongoose/models/MessageModel";
import { IMessageDocument } from "../database/mongoose/types/IMessageDocument";
import { IConversationDocument } from "../database/mongoose/types/IConversationDocument";
import { GymModel } from "../database/mongoose/models/GymModel";
import { clientModel } from "../database/mongoose/models/ClientModel";
import { TrainerModel } from "../database/mongoose/models/TrainerModel";

type UserLookup = { gymName?: string; fullName?: string; logoUrl?: string; profileUrl?: string } | null;

export class ChatRepository implements IChatRepository {
    
    async getConversations(userId: string): Promise<IConversationSummary[]> {
        const sortedUserId = userId.toString();
        const conversations = await ConversationModel.find({
            participants: { $in: [sortedUserId] }
        }).sort({ updatedAt: -1 });

        const detailedConversations = await Promise.all(conversations.map(async (conv) => {
            const otherParticipantId = conv.participants.find(p => p !== sortedUserId);
            
            // Try to find in all roles
            let otherUser: UserLookup = null;
            if (otherParticipantId) {
                otherUser = await GymModel.findById(otherParticipantId).select('gymName logoUrl email').lean();
                if (!otherUser) {
                    otherUser = await clientModel.findById(otherParticipantId).select('fullName profileUrl email').lean();
                }
                if (!otherUser) {
                    otherUser = await TrainerModel.findById(otherParticipantId).select('fullName profileUrl email').lean();
                }
            }

            return {
                id: conv._id.toString(),
                participants: conv.participants,
                lastMessage: conv.lastMessage,
                updatedAt: conv.updatedAt,
                otherUser: (otherUser && otherParticipantId) ? {
                    id: otherParticipantId,
                    name: otherUser.gymName || otherUser.fullName || "User",
                    avatar: otherUser.logoUrl || otherUser.profileUrl || ""
                } : null
            };
        }));

        return detailedConversations;
    }

    async getMessages(conversationId: string): Promise<IMessageDocument[]> {
        return await MessageModel.find({ conversationId }).sort({ createdAt: 1 });
    }

    async sendMessage(data: Partial<IMessageDocument>): Promise<IMessageDocument> {
        const message = await MessageModel.create(data);
        await ConversationModel.findByIdAndUpdate(data.conversationId, {
            lastMessage: data.content,
            updatedAt: new Date()
        });
        return message;
    }

    async getOrCreateConversation(participants: string[]): Promise<IConversationSummary> {
        // Sort participants to ensure consistency (e.g. [A, B] is same as [B, A])
        const sortedParticipants = [...participants].sort();
        
        let conversation: IConversationDocument | null = await ConversationModel.findOne({
            participants: { $all: sortedParticipants, $size: sortedParticipants.length }
        }).lean();

        if (!conversation) {
            const created = await ConversationModel.create({
                participants: sortedParticipants
            });
            conversation = created.toObject() as IConversationDocument;
        }

        const currentUserId = participants[0]; // Assuming first one is the searcher (usually req.user.id)
        const otherParticipantId = sortedParticipants.find(p => p !== currentUserId);
        
        let otherUser: UserLookup = null;
        if (otherParticipantId) {
            otherUser = await GymModel.findById(otherParticipantId).select('gymName logoUrl email').lean();
            if (!otherUser) {
                otherUser = await clientModel.findById(otherParticipantId).select('fullName profileUrl email').lean();
            }
            if (!otherUser) {
                otherUser = await TrainerModel.findById(otherParticipantId).select('fullName profileUrl email').lean();
            }
        }

        return {
            id: conversation._id.toString(),
            participants: conversation.participants,
            lastMessage: conversation.lastMessage,
            updatedAt: conversation.updatedAt,
            otherUser: (otherUser && otherParticipantId) ? {
                id: otherParticipantId.toString(),
                name: otherUser.gymName || otherUser.fullName || "User",
                avatar: otherUser.logoUrl || otherUser.profileUrl || ""
            } : null
        };
    }

    async markMessagesAsRead(conversationId: string, userId: string): Promise<void> {
        await MessageModel.updateMany(
            { conversationId, receiverId: userId, isRead: false },
            { $set: { isRead: true } }
        );
    }

    async getMessageById(messageId: string): Promise<IMessageDocument | null> {
        return await MessageModel.findById(messageId);
    }

    async deleteMessage(messageId: string): Promise<void> {
        await MessageModel.findByIdAndDelete(messageId);
    }
}
