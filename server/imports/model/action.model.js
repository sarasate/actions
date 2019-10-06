import { Actions } from '/imports/collections/actions.collection';

export const generateActionModel = ({ user }) => ({
  getAll: () => {
    return Actions.find({ userId: user._id, archived: { $ne: true } }).fetch();
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
  archiveAction: actionId => {
    return Actions.update(
      { _id: actionId, userId: user._id },
      { $set: { archived: true } }
    );
  },
  deleteAction: actionId => {
    return Actions.delete({
      _id: actionId,
      userId: user._id,
    });
  },
});
