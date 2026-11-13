import { IConfirmSubscriptionUseCase } from "../interfaces/IConfirmSubscriptionUseCase";
import { IPaymentService } from "../../../../shared/services/IPaymentService";
import { AppError } from "../../../../shared/errors/AppError";
import { HttpStatus } from "../../../../shared/constants/statusCodes.constants";

export class ConfirmSubscriptionUseCase implements IConfirmSubscriptionUseCase {
    constructor(private _paymentService: IPaymentService) {}

    async execute(sessionId: string): Promise<void> {
        const isPaid = await this._paymentService.verifyPaymentStatus(sessionId);
        if (!isPaid) {
            throw new AppError("Payment not completed", HttpStatus.BAD_REQUEST);
        }
    }
}