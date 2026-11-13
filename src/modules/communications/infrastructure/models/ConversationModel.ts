import { model } from "mongoose";
import { IConversationDocument } from "../../../../shared/database/mongoose/types/IConversationDocument";
import { ConversationSchema } from "../../../../shared/database/mongoose/schemas/ConversationSchema";

export const ConversationModel = model<IConversationDocument>("Conversation", ConversationSchema);
