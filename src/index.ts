import 'reflect-metadata';
import './env';

import { createConnection } from 'typeorm';
import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import { buildSchema } from 'type-graphql';

import { ExpressContext } from 'apollo-server-express/dist/ApolloServer';
import { ApolloContext } from '../@types/custom';
import { UserResolver } from './resolvers/UserResolver';
import { EventResolver } from './resolvers/EventResolver';
import { BookingResolver } from './resolvers/BookingResolver';

import isAuthMiddleware from './auth/auth-middleware';
import customAuthChecker from './auth/auth-checker';

const path = '/graphql';

async function bootstrap(): Promise<void> {
  const app = express();
  app.use(isAuthMiddleware);
  await createConnection();
  const schema = await buildSchema({
    emitSchemaFile: process.env.NODE_ENV === 'development',
    resolvers: [UserResolver, EventResolver, BookingResolver],
    authChecker: customAuthChecker,
  });
  const server = new ApolloServer({
    schema,
    context: (ctx: ExpressContext): ApolloContext => {
      const { isAuth, userId } = ctx.req;
      return { isAuth, userId };
    },
  });
  server.applyMiddleware({ app, path });
  await app.listen(process.env.PORT || 5000);
}

bootstrap();
