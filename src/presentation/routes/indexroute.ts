import { Router } from "express";
import gymRouter from "./gymroutes";
import refreshRouter from "./refreshroute"
import googleAuthRouter from "./googleAuthRoutes";
import superAdminRouter from "./super-adminRoutes";


const rootRouter = Router();

rootRouter.use("/", refreshRouter);
rootRouter.use("/", googleAuthRouter);
rootRouter.use("/", gymRouter);
rootRouter.use("/", superAdminRouter);


export default rootRouter; 
