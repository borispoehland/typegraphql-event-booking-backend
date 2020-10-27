"use strict";
var PostgressConnectionStringParser = require("pg-connection-string");
var connection = PostgressConnectionStringParser.parse(process.env.DB_CONNECTION_STRING);
var config = {
    type: 'postgres',
    host: connection.host,
    port: Number(connection.port),
    username: connection.user,
    password: connection.password,
    database: connection.database,
    entities: [process.env.ENTITY_LOCATION],
    synchronize: true,
    dropSchema: process.env.DB_DROP_SCHEMA === 'true',
    extra: {
        ssl: process.env.DB_SSL === 'true',
        connectionLimit: 5
    }
};
module.exports = config;
