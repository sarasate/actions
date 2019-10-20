<template>
  <input
    class="px-4 py-1 m-4"
    v-model.trim="action"
    placeholder="New action"
    v-on:keyup.enter="addAction"
  >
</template>

<script>
import gql from 'graphql-tag';
import ACTIONS_ADD from '../graphql/actions-add.gql';
import ACTIONS_ALL from '../graphql/actions-all.gql';
export default {
  data: function() {
    return { action: '' };
  },
  methods: {
    addAction() {
      this.$apollo
        .mutate({
          mutation: ACTIONS_ADD,
          variables: {
            title: this.action,
          },
          update: (store, { data: { addAction } }) => {
            // Read the data from our cache for this query.
            const data = store.readQuery({ query: ACTIONS_ALL });
            // Add our tag from the mutation to the end
            data.actions.push(addAction);
            // Write our data back to the cache.
            store.writeQuery({ query: ACTIONS_ALL, data });
          },
        })
        .then(() => {
          // Reset action text
          this.action = '';
        });
    },
  },
};
</script>

<style>
</style>