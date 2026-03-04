import mongoose from "mongoose";
import { IPlan } from "../types/IMembershipPlan";
import { planSchema } from "../schemas/MembershipPlanSchema";

export const PlanModel = mongoose.model<IPlan>("Plan", planSchema);