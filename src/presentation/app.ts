import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import indexRouter from "./routes/indexroute";
import { globalErrorHandler } from "./middlewares/globalErrorHandler";
import webhookRouter from "../presentation/routes/webhook.route"
import { httpLogger } from "../infrastructure/logger/httpLogger";

export const app = express();


/* GLOBAL MIDDLEWARES */

/*
  keep webhook route before json() middleware , require raw req data 
*/

app.use(webhookRouter); 

app.use(express.json());

const allowedOrigins = process.env.CLIENT_URLS?.split(",") || []; 


app.use(cors({
    origin: allowedOrigins,
    credentials: true
}));

app.use(cookieParser());

app.use(httpLogger); 



/* ROUTES */

//health check
app.get("/", (req, res) => {
    res.json({ status: "ok" })
})

app.use("/", indexRouter);


/* GLOBAL ERROR HANDLER */
app.use(globalErrorHandler); 




