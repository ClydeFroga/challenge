import { Hono } from "hono";
import { UserController } from "../../controllers/user.controller";
import { zValidator } from "@hono/zod-validator";
import { createUserSchema } from "../../schemas/user.schema";

export const createUserRoute = (controller: UserController) => {
  const router = new Hono();

  router.post("/", zValidator("json", createUserSchema), (c) =>
    controller.createUser(c)
  );

  return router;
};
