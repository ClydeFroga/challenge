import { Hono } from "hono";
import { UserController } from "../../controllers/user.controller.js";
import { getUsersRoute } from "./get-users.route.js";
import { getUserRoute } from "./get-user.route.js";
import { createUserRoute } from "./create-user.route.js";
import { updateUserRoute } from "./update-user.route.js";
import { deleteUserRoute } from "./delete-user.route.js";
import { deleteAllUserRoute } from "./delete-all-user.route.js";

export const createUserRoutes = (controller: UserController) => {
  const router = new Hono();

  router.route("/get", getUsersRoute(controller));
  router.route("/get/:id", getUserRoute(controller));
  router.route("/create", createUserRoute(controller));
  router.route("/update/:id", updateUserRoute(controller));
  router.route("/delete/:id", deleteUserRoute(controller));
  router.route("/delete", deleteAllUserRoute(controller));

  return router;
};
