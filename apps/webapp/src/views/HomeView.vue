<script setup lang="ts">
import { fetchWrapper } from "../helper/fetch";
import { ref } from "vue";

const actions = ref([]);

fetchWrapper.get("http://localhost:8080/actions").then((res) => {
  actions.value = res;
});
</script>

<template>
  <ul v-if="actions">
    <li v-for="action in actions">
      {{ action.name }}
    </li>
  </ul>
</template>

,
