import { Hono } from "hono";
import { UserController } from "../../controllers/user.controller.js";

export const deleteAllUserRoute = (controller: UserController) => {
  const router = new Hono();

  router.delete("/", (c) => controller.deleteAllUser(c));

  return router;
};
