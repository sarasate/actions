import { Actions } from '/imports/collections/actions.collection';
import { authenticated } from '/imports/auth/auth';

const resolvers = {
  Query: {
    actions: authenticated((_, __, { models }) => {
      return models.Action.getAll();
    }),
  },
  Mutation: {
    addAction: authenticated((root, { action }, { models }) => {
      return models.Action.addAction(action);
    }),
    archiveAction: authenticated((_, { actionId }, { models }) => {
      return models.Action.archiveAction(actionId);
    }),
    deleteAction: authenticated((_, { actionId }, { models }) => {
      return models.Action.deleteAction(actionId);
    }),
    createUser: authenticated((_, { user }, { models }) => {
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
  Action: {
    id: root => root._id,
    user: root => {
      return Meteor.users.findOne({ _id: root.userId });
    },
  },
};

export default resolvers;
