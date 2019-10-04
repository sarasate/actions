export const Actions = new Mongo.Collection('actions');

Actions.deny({
  insert() {
    return true;
  },
  update() {
    return true;
  },
  remove() {
    return true;
  }
});

Meteor.startup(function() {
  Actions._ensureIndex({ title: 'text' });
});
