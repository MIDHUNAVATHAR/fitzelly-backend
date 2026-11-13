import mongoose from "mongoose";
import { IPlan } from "../../../../shared/database/mongoose/types/IMembershipPlan";
import { planSchema } from "../../../../shared/database/mongoose/schemas/MembershipPlanSchema";

export const PlanModel = mongoose.model<IPlan>("Plan", planSchema);