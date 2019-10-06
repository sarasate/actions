export const generateUserModel = ({ user }) => ({
  getAll: () => {
    return Meteor.users.find().fetch();
  },
  getById: id => {
    return Meteor.users.findOne(id);
  },
  createUser: user => {
    const userId = Accounts.createUser(user);
    delete user.password;
    delete user.email;
    Meteor.users.update({ _id: userId }, { $set: user });
    return Meteor.users.findOne({ _id: userId });
  },
});
