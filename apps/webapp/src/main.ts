import { createApp } from "vue";
import { createPinia } from "pinia";
import urql, { cacheExchange, dedupExchange, fetchExchange } from "@urql/vue";
import { authExchange } from "@urql/exchange-auth";

import App from "./App.vue";
import router from "./router";

import "./assets/main.css";

const app = createApp(App);

app.use(createPinia());
app.use(urql, {
  url: "http://localhost:8080/graphql",
  exchanges: [
    dedupExchange,
    cacheExchange,
    authExchange(async (utils) => {
      const token = localStorage.getItem("accessToken");
      const refreshToken = localStorage.getItem("refreshToken");

      console.log("%cmain.ts line:24 token", "color: #007acc;", token);
      return {
        addAuthToOperation(operation) {
          if (!token) return operation;
          return utils.appendHeaders(operation, {
            Authorization: `Bearer ${token}`,
          });
        },
      };
    }),
    fetchExchange,
  ],
});
app.use(router);

app.mount("#app");
