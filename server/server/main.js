import { ApolloServer } from 'apollo-server-express';
import { WebApp } from 'meteor/webapp';
import { getUser } from 'meteor/apollo';

import typeDefs from './schema';
import resolvers from './resolvers';
import { generateUserModel } from '../imports/model/user.model';
import { generateActionModel } from '../imports/model/action.model';

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const user = await getUser(req.headers.authorization);

    return {
      user,
      models: {
        User: generateUserModel({ user }),
        Action: generateActionModel({ user }),
      },
    };
  },
});

server.applyMiddleware({
  app: WebApp.connectHandlers,
  path: '/graphql',
});

WebApp.connectHandlers.use('/graphql', (req, res) => {
  if (req.method === 'GET') {
    res.end();
  }
});
