import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { userIdParamSchema } from "../../schemas/user.schema.js";
export const deleteUserRoute = (controller) => {
    const router = new Hono();
    router.delete("/", zValidator("param", userIdParamSchema), (c) => controller.deleteUser(c));
    return router;
};
