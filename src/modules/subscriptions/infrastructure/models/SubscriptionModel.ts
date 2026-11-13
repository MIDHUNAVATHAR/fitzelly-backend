import { model } from "mongoose";
import { ISubscriptionDocument } from "../../../../shared/database/mongoose/types/ISubscriptionDocument";
import { SubscriptionSchema } from "../../../../shared/database/mongoose/schemas/SubscriptionSchema";



export const SubscriptionModel = model<ISubscriptionDocument>("Subscription", SubscriptionSchema);
