import { ISubscriptionDocument } from "../database/mongoose/types/ISubscriptionDocument";
import { Subscription } from "../../domain/entities/Subscription";
import { Types } from "mongoose";

export class SubscriptionMapper {
    static toEntity(doc: ISubscriptionDocument): Subscription {
        return new Subscription(
            doc._id.toString(),
            doc.gymId.toString(),
            doc.gymName,
            doc.planName,
            doc.amount,
            doc.startDate,
            doc.endDate,
            doc.status,
            doc.paymentGateway,
            doc.gatewayPaymentId,
            doc.gatewayOrderId,
            doc.createdAt
        );
    }

    static toDocument(entity: Subscription): Partial<ISubscriptionDocument> {
        return {
            gymId: new Types.ObjectId(entity.gymId),
            gymName: entity.gymName,
            planName: entity.planName,
            amount: entity.amount,
            startDate: entity.startDate,
            endDate: entity.endDate,
            status: entity.status,
            paymentGateway: entity.paymentGateway,
            gatewayPaymentId: entity.gatewayPaymentId,
            gatewayOrderId: entity.gatewayOrderId,
            createdAt: entity.createdAt
        };
    }
}
