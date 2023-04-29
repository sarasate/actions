<template>
  <div class="container m-auto">
    <LoginButton />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRoute } from "vue-router";
import { useAuthStore } from "@/stores";
import router from "../router";
import LoginButton from "@/components/LoginButton.vue";

const route = useRoute();
const email = ref("");
const password = ref("");
</script>
