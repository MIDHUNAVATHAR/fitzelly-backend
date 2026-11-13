import "./config/env.config";
import http from "http";
import { connectDB } from "./shared/database/connectDB";
import { connectRedis } from "./shared/database/RedisConnection";
import { SocketService } from "./shared/services/SocketService";
import { logger } from "./shared/logger/logger";
import { createContainer } from "./main/container";
import { createApp } from "./main/app";

async function bootstrap() {
    await connectDB();
    await connectRedis();

    const container = createContainer();
    const app = createApp(container);

    const PORT = process.env.PORT || 5000;
    const server = http.createServer(app);

    SocketService.init(server);

    server.listen(PORT, () => {
        logger.info(`Server started on port - ${PORT}`);
    });
}

bootstrap().catch((err) => {
    logger.error("Failed to bootstrap application:", { error: err });
    process.exit(1);
});
