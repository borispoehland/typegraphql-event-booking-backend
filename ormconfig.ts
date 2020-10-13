import {PostgresConnectionOptions} from "typeorm/driver/postgres/PostgresConnectionOptions";
import PostgressConnectionStringParser from "pg-connection-string";

const databaseUrl: string = (process.env.DB_CONNECTION_STRING as string);
const connectionOptions = PostgressConnectionStringParser.parse(databaseUrl);

const database: {[key: string]: string} = {
  development: "dev",
  production: 'prod',
  test: 'test'
}

const config: PostgresConnectionOptions = {
  type: "postgres",
  name: connectionOptions.application_name,
  host: (connectionOptions.host as string),
  port: (connectionOptions.port as unknown as number),
  username: connectionOptions.user,
  password: connectionOptions.password,
  database: database[(process.env.NODE_ENV as string)],
  entities: ["./src/models/*.ts"],
  dropSchema: process.env.NODE_ENV === 'test',
  synchronize: true,
  extra: {
    ssl: true
  }
}

export = config;
