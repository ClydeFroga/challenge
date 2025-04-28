import { Hono } from "hono";
import { UserController } from "../../controllers/user.controller.js";
import {
  updateUserSchema,
  userIdParamSchema,
  zValidatorCustom,
} from "../../schemas/user.schema.js";

export const updateUserRoute = (controller: UserController) => {
  const router = new Hono();

  router.patch(
    "/",
    zValidatorCustom("param", userIdParamSchema),
    zValidatorCustom("json", updateUserSchema),
    (c) => controller.updateUser(c)
  );

  return router;
};
