import "./config/env.config"

import { app } from "./presentation/app"

import { connectDB } from "./infrastructure/database/connectDB";

import { connectRedis } from "./infrastructure/database/RedisConnection";

import http from "http";
import { SocketService } from "./infrastructure/services/SocketService";
import { logger } from "./infrastructure/logger/logger";


async function bootstrap() {

    await connectDB();
    await connectRedis(); 

    const PORT = process.env.PORT;
    const server = http.createServer(app);

     SocketService.init(server);

    server.listen(PORT, () => {
        logger.info(`server started on port - ${PORT}`);
    })
}

bootstrap().catch((err) => {
    logger.error("Failed to bootstrap application:", {error: err});
    process.exit(1);
});