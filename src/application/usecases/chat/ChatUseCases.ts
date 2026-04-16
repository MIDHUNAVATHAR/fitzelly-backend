import { IChatRepository } from "../../../domain/repositories/IChatRepository";
import { IMessageDocument } from "../../../infrastructure/database/mongoose/types/IMessageDocument";

export class GetConversationsUseCase {
    constructor(private chatRepository: IChatRepository) { }
    async execute(userId: string) {
        return await this.chatRepository.getConversations(userId);
    }
}

export class GetMessagesUseCase {
    constructor(private chatRepository: IChatRepository) { }
    async execute(conversationId: string) {
        return await this.chatRepository.getMessages(conversationId);
    }
}

export class SendMessageUseCase {
    constructor(private chatRepository: IChatRepository) { }
    async execute(data: Partial<IMessageDocument>) {
        return await this.chatRepository.sendMessage(data);
    }
}

export class GetOrCreateConversationUseCase {
    constructor(private chatRepository: IChatRepository) { }
    async execute(participants: string[]) {
        return await this.chatRepository.getOrCreateConversation(participants);
    }
}

export class MarkMessagesAsReadUseCase {
    constructor(private chatRepository: IChatRepository) { }
    async execute(conversationId: string, userId: string) {
        return await this.chatRepository.markMessagesAsRead(conversationId, userId);
    }
}

export class DeleteMessageUseCase {
    constructor(private chatRepository: IChatRepository) { }
    async execute(messageId: string) {
        return await this.chatRepository.deleteMessage(messageId);
    }
}

export class GetMessageByIdUseCase {
    constructor(private chatRepository: IChatRepository) { }
    async execute(messageId: string) {
        return await this.chatRepository.getMessageById(messageId);
    }
}
