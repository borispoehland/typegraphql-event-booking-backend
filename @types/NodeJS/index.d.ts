declare namespace NodeJS {
  export interface ProcessEnv {
    PORT?: string;
    DB_CONNECTION_STRING: string;
    DB_DROP_SCHEMA: string;
    DB_SSL: string;
    ENTITY_LOCATION: string;
    JWT_SECRET: string;
  }
}
