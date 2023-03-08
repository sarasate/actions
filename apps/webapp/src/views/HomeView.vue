<script setup lang="ts">
import { useQuery } from "@vue/apollo-composable";
import gql from "graphql-tag";
import ActionForm from "../components/ActionForm.vue";

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
  <ActionForm />

  <div class="loading" v-if="loading">Loading..</div>
  <div class="error" v-if="error">{{ error.message }}</div>
  <table v-if="result && result.actions" class="table w-fu">
    <tbody>
      <tr v-for="action of result.actions" :key="action.id">
        <td>{{ action.name }}</td>
      </tr>
    </tbody>
  </table>
</template>

,
