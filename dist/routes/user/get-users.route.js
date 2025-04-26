import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { userFiltersSchema } from "../../schemas/user.schema.js";
export const getUsersRoute = (controller) => {
    const router = new Hono();
    router.get("/", zValidator("query", userFiltersSchema), (c) => controller.getAllUsers(c));
    return router;
};
