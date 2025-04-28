import { Hono } from "hono";
import { UserController } from "../../controllers/user.controller.js";
import { userIdParamSchema } from "../../schemas/user.schema.js";
import { zValidatorCustom } from "../../schemas/user.schema.js";

export const deleteUserRoute = (controller: UserController) => {
  const router = new Hono();

  router.delete("/", zValidatorCustom("param", userIdParamSchema), (c) =>
    controller.deleteUser(c)
  );

  return router;
};
