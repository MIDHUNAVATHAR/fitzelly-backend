import { model } from "mongoose";
import { IMessageDocument } from "../types/IMessageDocument";
import { MessageSchema } from "../schemas/MessageSchema";

export const MessageModel = model<IMessageDocument>("Message", MessageSchema);
