<script setup lang="ts">
import { useMutation } from "@vue/apollo-composable";
import { gql } from "graphql-tag";
import { ref } from "vue";

const name = ref("");

const CREATE_ACTION = gql`
  query getActions {
    actions {
      id
      name
    }
  }
`;

const { mutate: createAction } = useMutation(
  gql`
    mutation createAction($name: String!) {
      createAction(name: $name) {
        id
        name
      }
    }
  `,
  // Need a function here to get the latest value of `name`
  () => ({
    variables: {
      name: name.value,
    },
    update: (cache, { data }) => {
      const { actions } = cache.readQuery({
        query: CREATE_ACTION,
      });

      cache.writeQuery({
        query: CREATE_ACTION,
        data: {
          actions: [...actions, data.createAction],
        },
      });
    },
  })
);
</script>

<template>
  <input v-model="name" class="input" />
  <button @click="createAction()" class="btn">Submit</button>
</template>
