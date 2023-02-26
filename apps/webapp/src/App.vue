<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
import { useAuthStore } from "@/stores";
import { storeToRefs } from "pinia";

const authStore = useAuthStore();
const { user: authUser } = storeToRefs(authStore);
</script>

<template>
  <component :is="this.$route.meta.layout || 'div'">
    <router-view />
    <!-- <div id="teleport"></div> -->
  </component>
</template>
