import { model } from "mongoose";
import { ICallHistoryDocument } from "../types/ICallHistoryDocument";
import { CallHistorySchema } from "../schemas/CallHistorySchema";

export const CallHistoryModel = model<ICallHistoryDocument>("CallHistory", CallHistorySchema);
