import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { userIdParamSchema } from "../../schemas/user.schema.js";
export const getUserRoute = (controller) => {
    const router = new Hono();
    router.get("/", zValidator("param", userIdParamSchema), (c) => controller.getUserById(c));
    return router;
};
