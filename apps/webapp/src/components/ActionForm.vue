<script setup lang="ts">
import { useMutation, gql } from "@urql/vue";
import { ref } from "vue";

const name = ref("");

const { executeMutation: createAction } = useMutation(gql`
  mutation ($name: String!) {
    createAction(name: $name) {
      id
      name
    }
  }
`);

const create = () => {
  return createAction({ name: name.value }).then((result) => {
    console.log(result);
    name.value = "";
  });
};
</script>

<template>
  <input v-model="name" class="input" />
  <button @click="create()" class="btn">Submit</button>
</template>
