import "./config/env.config"

import { app } from "./presentation/app"

import { connectDB } from "./infrastructure/database/connectDB";


async function bootstrap() {

    await connectDB();

    const PORT = process.env.PORT;

    app.listen(PORT, () => {
        console.log(`server started on port - ${PORT}`);
    })
}

void bootstrap();