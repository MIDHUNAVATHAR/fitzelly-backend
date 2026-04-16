import "./config/env.config"

import { app } from "./presentation/app"

import { connectDB } from "./infrastructure/database/connectDB";

import { connectRedis } from "./infrastructure/database/RedisConnection";

import http from "http";
import { SocketService } from "./infrastructure/services/SocketService";


async function bootstrap() {

    await connectDB();
     await connectRedis(); 

    const PORT = process.env.PORT;
    const server = http.createServer(app);

     SocketService.init(server);

    server.listen(PORT, () => {
        console.log(`server started on port - ${PORT}`);
    })
}

bootstrap().catch((err) => {
    console.error("Failed to bootstrap application:", err);
    process.exit(1);
});