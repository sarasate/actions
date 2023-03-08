<script setup>
import { useMutation } from "@vue/apollo-composable";
import { gql } from "graphql-tag";
import { ref } from "vue";

const name = ref("");

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
  })
);
</script>

<template>
  <input v-model="name" class="input" />
  <button @click="createAction()" class="btn">Submit</button>
</template>
