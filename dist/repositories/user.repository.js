export class UserRepository {
    constructor(db) {
        this.db = db;
    }
    async findAll(filters) {
        if (!filters || Object.keys(filters).length === 0) {
            return await this.db.query("SELECT * FROM users");
        }
        const conditions = [];
        const values = [];
        if (filters.full_name) {
            conditions.push("full_name LIKE ?");
            values.push(`%${filters.full_name}%`);
        }
        if (filters.role) {
            conditions.push("role = ?");
            values.push(filters.role);
        }
        if (filters.efficiency !== undefined) {
            conditions.push("efficiency = ?");
            values.push(filters.efficiency);
        }
        const query = `SELECT * FROM users WHERE ${conditions.join(" AND ")}`;
        return await this.db.query(query, values);
    }
    async findById(id) {
        const users = await this.db.query("SELECT * FROM users WHERE id = ?", [id]);
        return users[0] || null;
    }
    async create(userData) {
        const result = await this.db.query("INSERT INTO users (full_name, role, efficiency) VALUES (?, ?, ?) RETURNING id", [userData.full_name, userData.role, userData.efficiency]);
        return result[0].id;
    }
    async update(id, userData) {
        const { updates, values } = this.mapUserFields(userData);
        if (updates.length === 0) {
            return await this.findById(id);
        }
        values.push(id);
        await this.db.query(`UPDATE users SET ${updates.join(", ")} WHERE id = ?`, values);
        return await this.findById(id);
    }
    async delete(id) {
        const user = await this.findById(id);
        if (!user) {
            throw new Error("Пользователь не найден");
        }
        await this.db.query(`DELETE FROM users WHERE id = ?`, [id]);
        return user;
    }
    async deleteAll() {
        await this.db.query("DELETE FROM users");
        return true;
    }
    mapUserFields(userData) {
        const fieldMappings = {
            full_name: "full_name",
            role: "role",
            efficiency: "efficiency",
        };
        const updates = [];
        const values = [];
        Object.entries(userData).forEach(([key, value]) => {
            if (value !== undefined) {
                const sqlField = fieldMappings[key];
                if (sqlField) {
                    updates.push(`${sqlField} = ?`);
                    values.push(value);
                }
            }
        });
        return { updates, values };
    }
}
