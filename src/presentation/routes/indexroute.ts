import { Router } from "express";
import gymRouter from "./gymroutes";
import refreshRouter from "./refreshroute"
import googleAuthRouter from "./googleAuthRoutes";
import superAdminRouter from "./super-adminRoutes";
import inviteRouter from "./inviteroutes"
import clientRouter from "./clientroutes";
import trainerRouter from "./trainerroutes";
import attendanceRouter from "./attendanceRoutes"
import equipmentBookingRouter from "./equipmentBookingRoutes"
import securityRouter from "./securityRoutes";
import chatRouter from "./chatRoutes";
import subscriptionRouter from "./subscriptionRoutes";


const rootRouter = Router();

rootRouter.use("/", refreshRouter);
rootRouter.use("/", googleAuthRouter);
rootRouter.use("/", gymRouter);
rootRouter.use("/", clientRouter);
rootRouter.use("/",trainerRouter);
rootRouter.use("/", superAdminRouter);
rootRouter.use("/", inviteRouter)

rootRouter.use("/", attendanceRouter);
rootRouter.use("/", equipmentBookingRouter);
rootRouter.use("/", securityRouter);
rootRouter.use("/", chatRouter);
rootRouter.use("/", subscriptionRouter);

export default rootRouter; 