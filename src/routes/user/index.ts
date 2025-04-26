import { Hono } from "hono";
import { UserController } from "../../controllers/user.controller";
import { getUsersRoute } from "./get-users.route";
import { getUserRoute } from "./get-user.route";
import { createUserRoute } from "./create-user.route";
import { updateUserRoute } from "./update-user.route";
import { deleteUserRoute } from "./delete-user.route";

export const createUserRoutes = (controller: UserController) => {
  const router = new Hono();

  router.route("/get", getUsersRoute(controller));
  router.route("/get/:id", getUserRoute(controller));
  router.route("/create", createUserRoute(controller));
  router.route("/update/:id", updateUserRoute(controller));
  router.route("/delete/:id", deleteUserRoute(controller));
  router.route("/delete", deleteUserRoute(controller));

  return router;
};
