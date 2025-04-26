import {
  CreateUserSchema,
  UserIdParamSchema,
  UpdateUserSchema,
  UserFiltersSchema,
} from "../schemas/user.schema";

declare module "hono" {
  interface ContextVariableMap {
    json: CreateUserSchema | UpdateUserSchema;
    param: UserIdParamSchema;
    query: UserFiltersSchema;
  }
}
