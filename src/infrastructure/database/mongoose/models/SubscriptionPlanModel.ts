import { model } from "mongoose";
import { ISubscriptionPlanDocument } from "../types/ISubscriptionPlanDocument";
import { SubscriptionPlanSchema } from "../schemas/SubscriptionPlanSchema";

export const SubscriptionPlanModel = model<ISubscriptionPlanDocument>("SubscriptionPlan", SubscriptionPlanSchema);
