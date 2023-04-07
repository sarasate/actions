<script setup lang="ts">
import { useQuery } from "@urql/vue";
import ActionForm from "../components/ActionForm.vue";

const { data, fetching, error } = useQuery({
  query: `  query getActions {
    actions {
      id
      name
    }
  }
`,
});
</script>

<template>
  <ActionForm />

  <div class="loading" v-if="fetching">Loading..</div>
  <div class="error" v-if="error">{{ error.message }}</div>
  <table v-if="data && data.actions" class="table w-fu">
    <tbody>
      <tr v-for="action of data.actions" :key="action.id">
        <td>{{ action.name }}</td>
      </tr>
    </tbody>
  </table>
</template>

,
