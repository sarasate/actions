<script setup>
import { useMutation, gql } from "@urql/vue";
import { defineProps } from "vue";

const props = defineProps({
  actionId: {
    type: String,
    required: true,
  },
});

const { executeMutation: deleteAction, fetching } = useMutation(
  gql`
    mutation ($id: String!) {
      removeAction(id: $id) {
        success
      }
    }
  `,
  {
    // variables() {
    //   return { id: props.actionId };
    // },
    update(cache) {
      cache.invalidate();
    },
  }
);

const deleteItem = () => {
  deleteAction({ id: props.actionId }).then((result) => {
    console.log(result);
  });
};
</script>

<template>
  <button class="btn btn-red" @click="deleteItem">Delete</button>
</template>
