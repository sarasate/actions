<script setup lang="ts">
import { useQuery } from "@vue/apollo-composable";
import gql from "graphql-tag";

const { result, loading, error } = useQuery(gql`
  query getActions {
    actions {
      id
      name
    }
  }
`);
</script>

<template>
  <div class="loading" v-if="loading">Loading..</div>
  <div class="error" v-if="error">{{ error.message }}</div>
  <ul v-if="result && result.actions">
    <li v-for="action of result.actions" :key="action.id">
      {{ action.name }}
    </li>
  </ul>
</template>

,
