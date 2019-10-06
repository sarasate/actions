import { Actions } from '/imports/collections/actions.collection';
import { authenticated } from '/imports/auth/auth';

const resolvers = {
  Query: {
    actions: authenticated((_, __, { user, models }) => {
      return models.Action.getAll();
    }),
  },
  Mutation: {
    addAction: authenticated((root, { action }, { user, models }) => {
      return models.Action.addAction(action);
    }),
    createUser: authenticated((root, { user }, { models }) => {
      return models.User.createUser(user);
    }),
    login: (root, { email, password }) => {
      const user = Accounts.findUserByEmail(email);
      const authenticated = Accounts._checkPassword(user, password);
      if (authenticated.error)
        throw new Error('Authentication failed!', authenticated.error);
      const stampedLogintoken = Accounts._generateStampedLoginToken();
      Accounts._insertLoginToken(user._id, stampedLogintoken);
      return { id: user._id, token: stampedLogintoken.token };
    },
  },
};

export default resolvers;
