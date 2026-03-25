import "./config/env.config"

import { app } from "./presentation/app"

import { connectDB } from "./infrastructure/database/connectDB";

import http from "http";
import { SocketService } from "./infrastructure/services/SocketService";
import { AutomatedExpiryCronService } from "./infrastructure/services/AutomatedExpiryCronService";


async function bootstrap() {

    await connectDB();

    const PORT = process.env.PORT;
    const server = http.createServer(app);

    SocketService.init(server);
    new AutomatedExpiryCronService().init();

    server.listen(PORT, () => {
        console.log(`server started on port - ${PORT}`);
    })
}

bootstrap();