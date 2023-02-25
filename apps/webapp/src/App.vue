<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <component :is="this.$route.meta.layout || 'div'">
    <router-view />
    <!-- <div id="teleport"></div> -->
  </component>
</template>
