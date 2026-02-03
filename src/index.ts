import { app } from "./presentation/app"
import dotenv from "dotenv";
import { connectDB } from "./infrastructure/database/connectDB";
import { logger } from "./infrastructure/logger/logger";

dotenv.config();

async function bootstrap() {

    await connectDB();

    const PORT = process.env.PORT;

    app.listen(PORT, () => {
        logger.info(`server started on port - ${PORT}`);
    })
}

bootstrap();