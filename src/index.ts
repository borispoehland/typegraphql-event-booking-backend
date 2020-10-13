import "reflect-metadata";
import "dotenv/config";

import {createConnection} from "typeorm";
import {ApolloServer} from "apollo-server-express";
import express from "express";
import {buildSchema} from "type-graphql";
import {BookResolver} from "./resolvers/BookResolver";
import {Context} from "./context";

async function bootstrap() {
    const app = express();
    await createConnection();
    const schema = await buildSchema({resolvers: [BookResolver]});
    const server = new ApolloServer({
        schema,
        context: (): Context => {
            return {isAuth: true};
        },
    });
    server.applyMiddleware({app, path: '/graphql'})
    await app.listen(process.env.PORT || 3000);
    console.log("Server has started!");
}

bootstrap();
