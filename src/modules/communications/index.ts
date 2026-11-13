import { ChatRepository } from "./infrastructure/repositories/ChatRepository";
import { CallHistoryRepository } from "./infrastructure/repositories/CallHistoryRepository";

import {
    GetConversationsUseCase,
    GetMessagesUseCase,
    SendMessageUseCase,
    GetOrCreateConversationUseCase,
    MarkMessagesAsReadUseCase,
    DeleteMessageUseCase,
    UploadChatAttachmentUseCase,
    GetMessageByIdUseCase,
} from "./application/use-cases/ChatUseCases";

import {
    SaveCallHistoryUseCase,
    GetUserCallHistoryUseCase,
} from "./application/use-cases/CallHistoryUseCases";

import { ChatController } from "./presentation/controllers/ChatController";
import { CallHistoryController } from "./presentation/controllers/CallHistoryController";
import { createCommunicationsRouter } from "./presentation/routes/communications.routes";

import { IS3Service } from "../../shared/services/IS3Service";

export interface CommunicationsModuleDependencies {
    s3Service: IS3Service;
    chatRepository?: ChatRepository;
    callHistoryRepository?: CallHistoryRepository;
}

export function initCommunicationsModule(deps: CommunicationsModuleDependencies) {
    const chatRepository = deps.chatRepository ?? new ChatRepository();
    const callHistoryRepository = deps.callHistoryRepository ?? new CallHistoryRepository();

    const getConversationsUseCase = new GetConversationsUseCase(chatRepository);
    const getMessagesUseCase = new GetMessagesUseCase(chatRepository);
    const sendMessageUseCase = new SendMessageUseCase(chatRepository);
    const getOrCreateConversationUseCase = new GetOrCreateConversationUseCase(chatRepository);
    const markMessagesAsReadUseCase = new MarkMessagesAsReadUseCase(chatRepository);
    const deleteMessageUseCase = new DeleteMessageUseCase(chatRepository, deps.s3Service);
    const uploadChatAttachmentUseCase = new UploadChatAttachmentUseCase(deps.s3Service);
    const getMessageByIdUseCase = new GetMessageByIdUseCase(chatRepository);

    const saveCallHistoryUseCase = new SaveCallHistoryUseCase(callHistoryRepository);
    const getUserCallHistoryUseCase = new GetUserCallHistoryUseCase(callHistoryRepository);

    const chatController = new ChatController(
        getConversationsUseCase,
        getMessagesUseCase,
        sendMessageUseCase,
        getOrCreateConversationUseCase,
        markMessagesAsReadUseCase,
        deleteMessageUseCase,
        uploadChatAttachmentUseCase
    );

    const callHistoryController = new CallHistoryController(
        saveCallHistoryUseCase,
        getUserCallHistoryUseCase
    );

    const router = createCommunicationsRouter({
        chatController,
        callHistoryController,
    });

    return {
        router,
        repositories: {
            chatRepository,
            callHistoryRepository,
        },
        controllers: {
            chatController,
            callHistoryController,
        },
        useCases: {
            getConversationsUseCase,
            getMessagesUseCase,
            sendMessageUseCase,
            getOrCreateConversationUseCase,
            markMessagesAsReadUseCase,
            deleteMessageUseCase,
            uploadChatAttachmentUseCase,
            getMessageByIdUseCase,
            saveCallHistoryUseCase,
            getUserCallHistoryUseCase,
        },
    };
}
