import mongoose from 'mongoose';
import { IMembership } from '../types/IMembership';
import membershipSchema from '../schemas/MembershipSchema';

export const MembershipModel = mongoose.model<IMembership>('Membership', membershipSchema);
