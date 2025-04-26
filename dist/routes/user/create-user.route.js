import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { createUserSchema } from "../../schemas/user.schema.js";
export const createUserRoute = (controller) => {
    const router = new Hono();
    router.post("/", zValidator("json", createUserSchema), (c) => controller.createUser(c));
    return router;
};
