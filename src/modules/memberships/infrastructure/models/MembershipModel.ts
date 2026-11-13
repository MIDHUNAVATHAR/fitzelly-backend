import mongoose from 'mongoose';
import { IMembership } from "../../../../shared/database/mongoose/types/IMembership";
import membershipSchema from "../../../../shared/database/mongoose/schemas/MembershipSchema";

export const MembershipModel = mongoose.model<IMembership>('Membership', membershipSchema);
