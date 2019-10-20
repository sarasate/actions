import { Actions } from '/imports/collections/actions.collection';

export const generateActionModel = ({ user }) => ({
  getAll: (completed = false) => {
    const query = completed
      ? { completed: true }
      : { $or: [{ completed: null }, { completed: false }] };
    return Actions.find({
      userId: user._id,
      ...query,
    }).fetch();
  },
  getById: id => {
    return Actions.findOne(id);
  },
  addAction: action => {
    const actionId = Actions.insert({
      ...action,
      userId: user._id,
      createdAt: new Date(),
    });

    return Actions.findOne({ _id: actionId });
  },
  completeAction: actionId => {
    return Actions.update(
      { _id: actionId, userId: user._id },
      { $set: { completed: true } }
    );
  },
  deleteAction: actionId => {
    Actions.remove({
      _id: actionId,
      userId: user._id,
    });
  },
});
