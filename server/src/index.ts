import { ApolloServer } from 'apollo-server-express';
import connectRedis from 'connect-redis';
import cors from 'cors';
import express from 'express';
import session from 'express-session';
import redis from 'redis';
import 'reflect-metadata';
import { buildSchema } from 'type-graphql';
import { createConnection } from 'typeorm';
import { COOKIE_NAME } from './constants';
import { User } from './entity/User';
import { authChecker } from './utils/authChecker';

const main = async () => {
  const connection = await createConnection();
  await connection.runMigrations();

  const RedisStore = connectRedis(session);
  const redisClient = redis.createClient();

  const app = express();

  app.use(
    cors({
      origin: 'http://localhost:3000',
      credentials: true,
    })
  );

  app.use(
    session({
      name: COOKIE_NAME,
      store: new RedisStore({ client: redisClient, disableTouch: true }),
      saveUninitialized: false,
      secret: 'keyboard cat',
      resave: false,
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365 * 5, // 5 years
        httpOnly: true,
        secure: false,
        sameSite: 'lax',
      },
    })
  );

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [__dirname + '/resolvers/**/*.{ts,js}'],
      validate: true,
      authChecker,
      // globalMiddlewares: [ResolveTime],
    }),
    context: async ({ req, res }) => ({
      req,
      res,
      session: req.session,
      currentUser: await User.findOne({ where: { id: req.session.userId } }),
    }),
  });

  apolloServer.applyMiddleware({ app, cors: false });

  app.listen(4000, () => {
    console.log('server started - http://localhost:4000/graphql');
  });
};

main();
