<template>
  <div class="home">
    <div v-for="action in actions" :key="action._id">{{action.title}}</div>
  </div>
</template>

<script>
// @ is an alias to /src
import gql from 'graphql-tag';

export default {
  name: 'home',
  apollo: {
    actions: gql`
      {
        actions {
          id
          title
        }
      }
    `,
  },
};
</script>
