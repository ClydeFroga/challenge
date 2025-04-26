import { Hono } from "hono";
import { UserController } from "../../controllers/user.controller";
import { zValidator } from "@hono/zod-validator";
import { userIdParamSchema } from "../../schemas/user.schema";

export const getUserRoute = (controller: UserController) => {
  const router = new Hono();

  router.get("/", zValidator("param", userIdParamSchema), (c) =>
    controller.getUserById(c)
  );

  return router;
};
