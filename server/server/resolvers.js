import { Actions } from '/imports/collections/actions.collection';
import { isAuthenticated } from '/imports/auth/auth';

const resolvers = {
  Query: {
    actions: (_, __, { user }) => {
      isAuthenticated(user);
      return Actions.find().fetch();
    },
  },
  Mutation: {
    addAction: (root, { action }, { user }) => {
      isAuthenticated(user);
      const actionId = Actions.insert(action);

      return Actions.findOne({ _id: actionId });
    },
    createUser: (root, { user }) => {
      const userId = Accounts.createUser(user);
      delete user.password;
      delete user.email;
      Meteor.users.update({ _id: userId }, { $set: user });
      return Meteor.users.findOne({ _id: userId });
    },

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
