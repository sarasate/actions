<template>
  <div class="home">
    <h1 class="h1">Actions</h1>
    <ActionInput />

    <ActionList :actions="actions" />
  </div>
</template>

<script>
import gql from 'graphql-tag';
import ActionList from '../components/ActionList';
import ActionInput from '../components/ActionInput';
import ACTIONS_ALL from '../graphql/actions-all.gql';

export default {
  name: 'home',
  components: { ActionList, ActionInput },
  apollo: {
    actions: { query: ACTIONS_ALL },
  },
};
</script>
