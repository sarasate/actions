<template>
  <div class="container m-auto">
    <form
      @submit.prevent="handleSubmit"
      class="form-control max-w-md rounded-lg m-auto p-4 mt-20 bg-base-300 [&>*]:my-2"
    >
      <input v-model="email" type="text" class="input" placeholder="email" />
      <input
        v-model="password"
        type="password"
        class="input"
        placeholder="password"
      />
      <button name="Submit" id="" class="btn">Submit</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRoute } from "vue-router";
import { useAuthStore } from "@/stores";
import router from "../router";

const route = useRoute();
const email = ref("");
const password = ref("");

// function onSubmit(values, { setErrors }) {
const handleSubmit = () => {
  const authStore = useAuthStore();

  const formData = { email: email.value, password: password.value };

  console.log(route.query.returnUrl);
  return authStore.login(formData).then(() => {
    router.push(route.query.returnUrl || "/");
  });
  // .catch((error) => setErrors({ apiError: error }));
};
</script>
