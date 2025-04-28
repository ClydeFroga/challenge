import { Hono } from "hono";
import { UserController } from "../../controllers/user.controller.js";
import {
  userIdParamSchema,
  zValidatorCustom,
} from "../../schemas/user.schema.js";

export const getUserRoute = (controller: UserController) => {
  const router = new Hono();

  router.get("/", zValidatorCustom("param", userIdParamSchema), (c) =>
    controller.getUserById(c)
  );

  return router;
};
