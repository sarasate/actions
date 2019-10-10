<template>
  <div class="archive">
    <h1>Archive</h1>
    <ActionList :actions="actions" />
  </div>
</template>

<script>
import gql from 'graphql-tag';
import ActionList from '../components/ActionList';

export default {
  name: 'home',
  components: { ActionList },
  apollo: {
    actions: gql`
      {
        actions(completed: true) {
          id
          title
          createdAt
          completed
        }
      }
    `,
  },
};
</script>
