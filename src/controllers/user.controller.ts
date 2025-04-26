import { Context } from "hono";
import { UserRepository } from "../repositories/user.repository";
import { User, UserCreateDTO, UserUpdateDTO, UserFilters } from "../types/user";
import { CreateUserSchema, UserIdParamSchema } from "../schemas/user.schema";
import { ErrorHandler } from "../utils/error-handler";

export class UserController {
  constructor(private readonly userRepository: UserRepository) {}

  async getAllUsers(c: Context) {
    try {
      const filters = c.req.valid("query") as UserFilters;

      const users = await this.userRepository.findAll(filters);
      return c.json({ success: true, result: { users: users } });
    } catch (error) {
      return ErrorHandler.internalServerError(c, error);
    }
  }

  async getUserById(c: Context) {
    try {
      const { id } = c.req.valid("param");
      const user = await this.userRepository.findById(id);
      let users: User[] = [];

      if (!user) {
        users = await this.userRepository.findAll();
      }

      return c.json({ success: true, result: { users: user || users } });
    } catch (error) {
      return ErrorHandler.internalServerError(c, error);
    }
  }

  async createUser(c: Context) {
    try {
      const validatedData = c.req.valid("json") as CreateUserSchema;

      const userData: UserCreateDTO = {
        full_name: validatedData.full_name,
        role: validatedData.role,
        efficiency: validatedData.efficiency,
      };

      const user_id = await this.userRepository.create(userData);
      return c.json({ success: true, result: { id: user_id } }, 201);
    } catch (error) {
      return ErrorHandler.internalServerError(c, error);
    }
  }

  async updateUser(c: Context) {
    try {
      const { id } = c.req.valid("param");
      const userData = c.req.valid("json") as UserUpdateDTO;
      const user = await this.userRepository.update(id, userData);

      if (!user) {
        return ErrorHandler.notFound(c, "Пользователь не найден");
      }

      return c.json({ success: true, result: user });
    } catch (error) {
      return ErrorHandler.internalServerError(c, error);
    }
  }

  async deleteUser(c: Context) {
    try {
      const { id } = c.req.valid("param");
      const user = await this.userRepository.delete(id);

      return c.json({
        success: true,
        result: user,
      });
    } catch (error) {
      return ErrorHandler.internalServerError(c, error);
    }
  }

  async deleteAllUser(c: Context) {
    try {
      const success = await this.userRepository.deleteAll();
      return c.json({ success: success });
    } catch (error) {
      return ErrorHandler.internalServerError(c, error);
    }
  }
}
