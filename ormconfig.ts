import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import * as PostgressConnectionStringParser from 'pg-connection-string';

const connection = PostgressConnectionStringParser.parse(process.env.DB_CONNECTION_STRING);

const config: PostgresConnectionOptions = {
  type: 'postgres',
  host: connection.host as string,
  port: Number(connection.port),
  username: connection.user,
  password: connection.password,
  database: connection.database as string,
  entities: [process.env.ENTITY_LOCATION],
  synchronize: true,
  dropSchema: process.env.DB_DROP_SCHEMA === 'true',
  extra: {
    ssl: process.env.DB_SSL === 'true',
    connectionLimit: 5,
  },
};

export = config;
