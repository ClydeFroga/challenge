import { Hono } from "hono";
// import { zValidator } from "@hono/zod-validator";
import { UserController } from "../../controllers/user.controller.js";
import { userFiltersSchema } from "../../schemas/user.schema.js";
import { zValidatorCustom } from "../../schemas/user.schema.js";

export const getUsersRoute = (controller: UserController) => {
  const router = new Hono();

  router.get("/", zValidatorCustom("query", userFiltersSchema), (c) =>
    controller.getAllUsers(c)
  );

  return router;
};
