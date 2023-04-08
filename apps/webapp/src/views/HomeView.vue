<script setup lang="ts">
import { useQuery } from "@urql/vue";
import ActionForm from "../components/ActionForm.vue";
import Date from "@/components/Date.vue";
import Delete from "@/components/Delete.vue";

const { data, fetching, error } = useQuery({
  query: `  query getActions {
    actions {
      id
      name
      priority
      dueDate
      tags
    }
  }
`,
});
</script>

<template>
  <ActionForm />

  <div class="loading" v-if="fetching">Loading..</div>
  <div class="error" v-if="error">{{ error.message }}</div>
  <table v-if="data && data.actions" class="table">
    <tbody>
      <tr v-for="action of data.actions" :key="action.id">
        <td>{{ action.name }}</td>
        <td>{{ action.priority }}</td>
        <td><Date :date="action.dueDate" /></td>
        <td>{{ action.tags }}</td>
        <td><Delete :actionId="action.id" /></td>
      </tr>
    </tbody>
  </table>
</template>

,
