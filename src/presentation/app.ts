import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import indexRouter from "./routes/indexroute";
import { globalErrorHandler } from "./middlewares/globalErrorHandler";
import { httpLogger } from "../infrastructure/logger/httpLogger";

export const app = express();


/* GLOBAL MIDDLEWARES */
app.post(
    "/api/webhook",
    express.raw({ type: "application/json" }),
    (req, res, next) => {
        const { webhookController } = require("../main/controllers.di");
        webhookController.handleStripeWebhook(req, res, next);
    }
);

app.use(express.json());

app.use(cors({
    origin: ["http://localhost:5174", "http://localhost:5173", "http://192.168.1.56:5173"],
    credentials: true
}));

app.use(cookieParser());

app.use(httpLogger)



/* ROUTES */
app.use("/", indexRouter);

//health check
app.get("/", (req, res) => {
    res.json({ status: "ok" })
})


/* GLOBAL ERROR HANDLER */
app.use(globalErrorHandler)