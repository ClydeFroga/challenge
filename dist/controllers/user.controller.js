import { ErrorHandler } from "../utils/error-handler.js";
export class UserController {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async getAllUsers(c) {
        try {
            const filters = c.req.valid("query");
            const users = await this.userRepository.findAll(filters);
            return c.json({ success: true, result: { users: users } });
        }
        catch (error) {
            return ErrorHandler.internalServerError(c, error);
        }
    }
    async getUserById(c) {
        try {
            const { id } = c.req.valid("param");
            const user = await this.userRepository.findById(id);
            let users = [];
            if (!user) {
                users = await this.userRepository.findAll();
            }
            return c.json({ success: true, result: { users: user || users } });
        }
        catch (error) {
            return ErrorHandler.internalServerError(c, error);
        }
    }
    async createUser(c) {
        try {
            const validatedData = c.req.valid("json");
            const userData = {
                full_name: validatedData.full_name,
                role: validatedData.role,
                efficiency: validatedData.efficiency,
            };
            const user_id = await this.userRepository.create(userData);
            return c.json({ success: true, result: { id: user_id } }, 201);
        }
        catch (error) {
            return ErrorHandler.internalServerError(c, error);
        }
    }
    async updateUser(c) {
        try {
            const { id } = c.req.valid("param");
            const userData = c.req.valid("json");
            const user = await this.userRepository.update(id, userData);
            if (!user) {
                return ErrorHandler.notFound(c, "Пользователь не найден");
            }
            return c.json({ success: true, result: user });
        }
        catch (error) {
            return ErrorHandler.internalServerError(c, error);
        }
    }
    async deleteUser(c) {
        try {
            const { id } = c.req.valid("param");
            const user = await this.userRepository.delete(id);
            return c.json({
                success: true,
                result: user,
            });
        }
        catch (error) {
            return ErrorHandler.internalServerError(c, error);
        }
    }
    async deleteAllUser(c) {
        try {
            const success = await this.userRepository.deleteAll();
            return c.json({ success: success });
        }
        catch (error) {
            return ErrorHandler.internalServerError(c, error);
        }
    }
}
