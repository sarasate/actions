<template>
  <div>
    <div
      v-for="action in actions"
      :key="action._id"
    >
      <div class="flex items-center justify-between p-2 mb-2 shadow">
        <div class="w-1/3 ">
          {{ action.title }}
          <span :key="tag" v-for="tag in action.tags" class='bg-gray-200 rounded px-2'>{{tag}}</span>
        </div>
        <div class=" flex justify-between">
          <div
            class="bg-blue-500 rounded text-white py-1 px-4 cursor-pointer"
            v-on:click.once='completeAction(action.id)'
          >Done</div>
          <div
            class="bg-red-500 rounded text-white py-1 px-4 cursor-pointer"
            v-on:click.once='deleteAction(action.id)'
          >Delete</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import gql from 'graphql-tag';
import ACTIONS_ALL from '../../graphql/actions-all.gql';
export default {
  props: {
    actions: [Array],
  },
  methods: {
    completeAction(actionId) {
      this.$apollo
        .mutate({
          mutation: gql`
            mutation($actionId: ID!) {
              completeAction(actionId: $actionId)
            }
          `,
          variables: { actionId },
          // update:(store, {data:})
          refetchQueries: [
            { query: ACTIONS_ALL }
          ],
        })
        .then(data => {
          // Result
          this.success();
        })
        .catch(error => {
          // Error
          this.error();
          // We restore the initial user input
          // this.newTag = newTag;
        });
    },
    deleteAction(actionId) {
      this.$apollo.mutate({
        mutation: gql`
          mutation($actionId: ID!) {
            deleteAction(actionId: $actionId)
          }
        `,
        variables: { actionId },
        refetchQueries: [
          {
             query: ACTIONS_ALL 
          },
        ],
      });
    },
  },
  notifications: {
    success: {
      title: 'Action completed',
      type: 'success', // You also can use 'VueNotifications.types.error' instead of 'error'
    },
    error: {
      title: 'Error',
      type: 'error',
    },
  },
};
</script>

<style scoped>
</style>