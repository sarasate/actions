import { Actions } from '/imports/collections/actions.collection';

export const generateActionModel = ({ user }) => ({
  getAll: () => {
    return Actions.find({ userId: user._id }).fetch();
  },
  getById: id => {
    return Actions.findOne({ _id: id });
  },
  addAction: action => {
    const actionId = Actions.insert({ ...action, userId: user._id });

    return Actions.findOne({ _id: actionId });
  },
});
