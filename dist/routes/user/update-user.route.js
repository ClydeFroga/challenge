import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { updateUserSchema, userIdParamSchema, } from "../../schemas/user.schema.js";
export const updateUserRoute = (controller) => {
    const router = new Hono();
    router.patch("/", zValidator("param", userIdParamSchema), zValidator("json", updateUserSchema), (c) => controller.updateUser(c));
    return router;
};
