export interface DatabaseConfig {
  host: string;
  user: string;
  password: string;
  database: string;
  port: number;
}

export interface DatabaseConnection {
  query: (sql: string, params?: any[]) => Promise<any>;
  end: () => Promise<void>;
  initialize: () => Promise<void>;
}
