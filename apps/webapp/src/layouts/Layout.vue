<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <header>
    <div class="">
      <nav class="navbar bg-base-100">
        <div class="container mx-auto">
          <a class="btn btn-ghost normal-case text-xl">Actions</a>
        </div>
      </nav>
    </div>
  </header>

  <div class="container mx-auto">
    <RouterView />
  </div>
</template>
