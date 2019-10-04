import { Actions } from '/imports/collections/actions.collection';

const resolvers = {
  Query: {
    actions: () => Actions.find().fetch(),
  },
  Mutation: {
    addAction: (root, { action }, context) => {
      console.log('line 8: context', context);

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
    login: (root, { login }) => {
      const user = Accounts.findUserByEmail(login.email);
      const authenticated = Accounts._checkPassword(user, login.password);
      if (authenticated.error)
        throw new Error('Authentication failed!', authenticated.error);
      const stampedLogintoken = Accounts._generateStampedLoginToken();
      Accounts._insertLoginToken(user._id, stampedLogintoken);
      return { _id: user._id, token: stampedLogintoken.token };
    },
  },
};

export default resolvers;
