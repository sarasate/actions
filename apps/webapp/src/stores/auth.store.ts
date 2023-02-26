import { defineStore } from "pinia";
import router from "@/router";
import { computed, ref } from "vue";
import axios from "axios";

const baseUrl = `http://localhost:8080`;

export const useAuthStore = defineStore("auth", () => {
  const user = ref(JSON.parse(localStorage.getItem("user") || "{}"));
  const returnUrl = ref(null);

  const isAuthenticated = computed(() => !!user.value?.id);

  const login = async ({ email, password }) => {
    const { data } = await axios.post(`${baseUrl}/auth/login`, {
      email,
      password,
    });
    user.value = data.user;
    localStorage.setItem("user", JSON.stringify(data.user));
    localStorage.setItem("accessToken", JSON.stringify(data.accessToken));
    // router.push(returnUrl || "/");
  };

  const logout = () => {
    // TODO revoke token on server
    user.value = null;
    router.push("/login");
  };
  return { isAuthenticated, login, logout, user };
});
