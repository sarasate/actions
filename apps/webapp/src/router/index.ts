import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import PublicLayout from "@/layouts/PublicLayout.vue";
import { useAuthStore } from "@/stores";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
      meta: { layout: PublicLayout, requiresAuth: true },
    },
    {
      path: "/login",
      name: "login",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/LoginView.vue"),
      meta: { layout: PublicLayout },
    },
  ],
});

router.beforeEach(async (to) => {
  // redirect to login page if not logged in and trying to access a restricted page
  const publicPages = ["/login"];
  const authRequired = !publicPages.includes(to.path);
  const authStore = useAuthStore();

  if (authRequired && !authStore.user) {
    return {
      path: "/login",
      query: { returnUrl: to.href },
    };
  }
});

export default router;
