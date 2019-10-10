import { authenticated } from '/imports/auth/auth';

const resolvers = {
  Query: {
    actions: authenticated((_, { completed = false }, { models }) => {
      return models.Action.getAll(completed);
    }),
  },
  Mutation: {
    addAction: authenticated((root, { action }, { models }) => {
      return models.Action.addAction(action);
    }),
    completeAction: authenticated((_, { actionId }, { models }) => {
      return models.Action.completeAction(actionId);
    }),
    deleteAction: authenticated((_, { actionId }, { models }) => {
      return models.Action.deleteAction(actionId);
    }),
    createUser: (_, { user }, { models }) => {
      return models.User.createUser(user);
    },
    login: (root, { email, password }) => {
      const user = Accounts.findUserByEmail(email);
      const isAuthenticated = Accounts._checkPassword(user, password);
      if (isAuthenticated.error)
        throw new Error('Authentication failed!', authenticated.error);
      const stampedLogintoken = Accounts._generateStampedLoginToken();
      Accounts._insertLoginToken(user._id, stampedLogintoken);
      return { id: user._id, token: stampedLogintoken.token };
    },
  },
  Action: {
    id: root => root && root._id,
    user: root => {
      return Meteor.users.findOne({ _id: root.userId });
    },
  },
};

export default resolvers;
