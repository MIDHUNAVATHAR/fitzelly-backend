import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { AppContainer } from "./container";
import { createApiRouter } from "./routes";
import { httpLogger } from "../shared/logger/httpLogger";
import { globalErrorHandler } from "../shared/middleware/globalErrorHandler";

export function createApp(container: AppContainer) {
    const app = express();

    /* GLOBAL MIDDLEWARES */

    // 1. HTTP Request Logger
    app.use(httpLogger);

    // 2. Stripe Webhook (Raw body parser before json())
    app.use(container.modules.subscriptions.webhookRouter);

    // 3. JSON & URL-encoded Body Parsers
    app.use(express.json());

    // 4. CORS
    const allowedOrigins = process.env.CLIENT_URLS?.split(",") || [];
    app.use(
        cors({
            origin: allowedOrigins,
            credentials: true,
        }),
    );

    // 5. Cookie Parser
    app.use(cookieParser());

    /* ROUTES */

    // Health check
    app.get("/", (_req, res) => {
        res.json({ status: "ok" });
    });

    // Central API Router mounting all 15 business modules
    const apiRouter = createApiRouter(container);
    app.use("/", apiRouter);

    /* GLOBAL ERROR HANDLER */
    app.use(globalErrorHandler);

    return app;
}
