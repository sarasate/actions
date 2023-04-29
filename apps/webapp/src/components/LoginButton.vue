<template>
  <button @click="login">Log in</button>
</template>

<script lang="ts">
import { useAuth0 } from "@auth0/auth0-vue";

export default {
  setup() {
    const { loginWithRedirect, loginWithPopup } = useAuth0();

    return {
      login() {
        loginWithRedirect();
      },
    };
  },
};
</script>
