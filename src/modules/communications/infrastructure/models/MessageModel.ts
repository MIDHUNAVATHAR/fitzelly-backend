import { model } from "mongoose";
import { IMessageDocument } from "../../../../shared/database/mongoose/types/IMessageDocument";
import { MessageSchema } from "../../../../shared/database/mongoose/schemas/MessageSchema";

export const MessageModel = model<IMessageDocument>("Message", MessageSchema);
