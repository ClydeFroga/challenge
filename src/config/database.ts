import mariadb from "mariadb";
import { DatabaseConfig, DatabaseConnection } from "./types.js";
import dotenv from "dotenv";

dotenv.config();

class MySQLConnection implements DatabaseConnection {
  private pool: mariadb.Pool;
  private connection: mariadb.PoolConnection | null = null;

  constructor(config: DatabaseConfig) {
    this.pool = mariadb.createPool(config);
  }

  async initialize(): Promise<void> {
    if (!this.connection) {
      this.connection = await this.pool.getConnection();
    }
  }

  async query(sql: string, params?: any[]): Promise<any> {
    return this.connection!.query(sql, params);
  }

  async end(): Promise<void> {
    if (this.connection) {
      await this.connection.release();
      this.connection = null;
    }
    await this.pool.end();
  }
}

class DatabaseFactory {
  private static instance: DatabaseFactory;
  private connection: DatabaseConnection | null = null;

  private constructor() {}

  static getInstance(): DatabaseFactory {
    if (!DatabaseFactory.instance) {
      DatabaseFactory.instance = new DatabaseFactory();
    }
    return DatabaseFactory.instance;
  }

  async createConnection(config: DatabaseConfig): Promise<DatabaseConnection> {
    if (!this.connection) {
      this.connection = new MySQLConnection(config);
      await this.connection.initialize();
    }
    return this.connection;
  }

  getConnection(): DatabaseConnection {
    if (!this.connection) {
      throw new Error("Database connection not initialized");
    }
    return this.connection;
  }
}

export const dbConfig: DatabaseConfig = {
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "password",
  database: process.env.DB_NAME || "database",
  port: parseInt(process.env.DB_PORT || "3306"),
};

export const databaseFactory = DatabaseFactory.getInstance();
