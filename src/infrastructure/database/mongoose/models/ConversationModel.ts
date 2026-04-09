import { model } from "mongoose";
import { IConversationDocument } from "../types/IConversationDocument";
import { ConversationSchema } from "../schemas/ConversationSchema";

export const ConversationModel = model<IConversationDocument>("Conversation", ConversationSchema);
