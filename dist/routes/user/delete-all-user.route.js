import { Hono } from "hono";
export const deleteAllUserRoute = (controller) => {
    const router = new Hono();
    router.delete("/", (c) => controller.deleteAllUser(c));
    return router;
};
