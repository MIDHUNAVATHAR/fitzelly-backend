import { Router } from "express";
import { ROLES } from "../../constants/roles.constants";
import gymRouter from "./gymroutes";
import refreshRouter from "./refreshroute"
import googleAuthRouter from "./googleAuthRoutes";
import superAdminRouter from "./super-adminRoutes";


const rootRouter = Router();

rootRouter.use(`/${ROLES.GYM}`, gymRouter);
rootRouter.use("/auth", googleAuthRouter)
rootRouter.use("/auth", refreshRouter);
rootRouter.use("/", superAdminRouter)


export default rootRouter; 
