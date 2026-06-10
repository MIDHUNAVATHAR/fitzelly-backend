import mongoose, { Schema } from 'mongoose';
import  SessionSchema  from '../schemas/SessionSchema';
import { ISession } from '../types/ISessionDocument';

export const SessionModel = mongoose.model<ISession>('Session', SessionSchema);
