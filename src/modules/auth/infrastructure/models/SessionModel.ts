import mongoose from 'mongoose';
import  SessionSchema  from "../../../../shared/database/mongoose/schemas/SessionSchema";
import { ISession } from "../../../../shared/database/mongoose/types/ISessionDocument";

export const SessionModel = mongoose.model<ISession>('Session', SessionSchema);
