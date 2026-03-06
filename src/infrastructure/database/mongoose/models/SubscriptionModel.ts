import { model } from "mongoose";
import { ISubscriptionDocument } from "../types/ISubscriptionDocument";
import { SubscriptionSchema } from "../schemas/SubscriptionSchema";



export const SubscriptionModel = model<ISubscriptionDocument>("Subscription", SubscriptionSchema);
