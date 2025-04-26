import { Hono } from "hono";
import { UserController } from "../../controllers/user.controller";
import { zValidator } from "@hono/zod-validator";
import { userFiltersSchema } from "../../schemas/user.schema";

export const getUsersRoute = (controller: UserController) => {
  const router = new Hono();

  router.get("/", zValidator("query", userFiltersSchema), (c) =>
    controller.getAllUsers(c)
  );

  return router;
};
