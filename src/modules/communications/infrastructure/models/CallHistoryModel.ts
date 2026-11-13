import { model } from "mongoose";
import { ICallHistoryDocument } from "../../../../shared/database/mongoose/types/ICallHistoryDocument";
import { CallHistorySchema } from "../../../../shared/database/mongoose/schemas/CallHistorySchema";

export const CallHistoryModel = model<ICallHistoryDocument>("CallHistory", CallHistorySchema);
