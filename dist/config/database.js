import mariadb from "mariadb";
import dotenv from "dotenv";
dotenv.config();
class MySQLConnection {
    constructor(config) {
        this.connection = null;
        this.pool = mariadb.createPool(config);
    }
    async initialize() {
        if (!this.connection) {
            this.connection = await this.pool.getConnection();
        }
    }
    async query(sql, params) {
        return this.connection.query(sql, params);
    }
    async end() {
        if (this.connection) {
            await this.connection.release();
            this.connection = null;
        }
        await this.pool.end();
    }
}
class DatabaseFactory {
    constructor() {
        this.connection = null;
    }
    static getInstance() {
        if (!DatabaseFactory.instance) {
            DatabaseFactory.instance = new DatabaseFactory();
        }
        return DatabaseFactory.instance;
    }
    async createConnection(config) {
        if (!this.connection) {
            this.connection = new MySQLConnection(config);
            await this.connection.initialize();
        }
        return this.connection;
    }
    getConnection() {
        if (!this.connection) {
            throw new Error("Database connection not initialized");
        }
        return this.connection;
    }
}
export const dbConfig = {
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "password",
    database: process.env.DB_NAME || "database",
    port: parseInt(process.env.DB_PORT || "3306"),
};
export const databaseFactory = DatabaseFactory.getInstance();
