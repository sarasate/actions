<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <header>
    <div class="container m-auto">
      <nav class="navbar">
        <RouterLink to="/" class="btn btn-ghost">Home</RouterLink>
        <ul class="menu menu-horizontal">
          <li>
            <RouterLink to="/login">Login</RouterLink>
          </li>
        </ul>
      </nav>
    </div>
  </header>

  <RouterView />
</template>
