import express from "express";
import { WEBHOOK_ROUTE } from "../../constants/routes.constants";
import { webhookController } from "../../main/controllers.di";

const router = express.Router();

router.post(WEBHOOK_ROUTE,express.raw({type:"application/json"}),webhookController.handleStripeWebhook);

export default router; 
