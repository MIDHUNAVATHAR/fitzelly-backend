import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import indexRouter from "./routes/indexroute";
import { globalErrorHandler } from "./middlewares/globalErrorHandler";
import { logger } from "../infrastructure/logger/logger";

export const app = express();


/* GLOBAL MIDDLEWARES */
app.use(express.json());

app.use(cors({
    origin: ["http://localhost:5174", "http://localhost:5173"],
    credentials: true
}));

app.use(cookieParser());


app.use((req, res, next) => {
    logger.debug(`[Request] ${req.method} ${req.url}`);
    next();
})


/* ROUTES */
app.use("/", indexRouter);

//health check
app.get("/", (req, res) => {
    res.json({ status: "ok" })
})


/* GLOBAL ERROR HANDLER */
app.use(globalErrorHandler)