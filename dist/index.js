import { Hono } from "hono";
import { serve } from "@hono/node-server";
import { databaseFactory, dbConfig } from "./config/database.js";
import { UserRepository } from "./repositories/user.repository.js";
import { UserController } from "./controllers/user.controller.js";
import { createUserRoutes } from "./routes/user/index.js";
const app = new Hono();
async function main() {
    const db = await databaseFactory.createConnection(dbConfig);
    const userRepository = new UserRepository(db);
    const userController = new UserController(userRepository);
    app.route("/", createUserRoutes(userController));
    const port = 3000;
    console.log(`Сервер запущен на порту ${port}`);
    serve({
        fetch: app.fetch,
        port,
    });
}
main().catch(console.error);
