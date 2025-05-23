import { Hono } from "hono";
import { UserController } from "../../controllers/user.controller.js";
import { zValidatorCustom } from "../../schemas/user.schema.js";
import { createUserSchema } from "../../schemas/user.schema.js";

export const createUserRoute = (controller: UserController) => {
  const router = new Hono();

  router.post("/", zValidatorCustom("json", createUserSchema), (c) =>
    controller.createUser(c)
  );

  return router;
};
