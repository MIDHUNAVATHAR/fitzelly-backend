import { model } from "mongoose";
import { ISubscriptionPlanDocument } from "../../../../shared/database/mongoose/types/ISubscriptionPlanDocument";
import { SubscriptionPlanSchema } from "../../../../shared/database/mongoose/schemas/SubscriptionPlanSchema";

export const SubscriptionPlanModel = model<ISubscriptionPlanDocument>("SubscriptionPlan", SubscriptionPlanSchema);
