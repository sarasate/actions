import { createApp } from "vue";
import { createPinia } from "pinia";
import urql, { dedupExchange, fetchExchange, gql } from "@urql/vue";
import { cacheExchange } from "@urql/exchange-graphcache";
import { devtoolsExchange } from "@urql/devtools";
import { authExchange } from "@urql/exchange-auth";

import App from "./App.vue";
import router from "./router";

import "./assets/main.css";
import { cacheConfig } from "./graphql/cache.exchange";
import { createAuth0 } from "@auth0/auth0-vue";

const auth0Client = createAuth0({
  domain: "sarasate.eu.auth0.com",
  clientId: "JgYwmLh41cgp5nX49sArjdOENt35edbx",
  authorizationParams: {
    redirect_uri: window.location.origin,
    audience: "actions",
  },
});
const app = createApp(App);

app.use(auth0Client);
app.use(createPinia());
app.use(urql, {
  url: "http://localhost:8080/graphql",
  exchanges: [
    devtoolsExchange,
    dedupExchange,
    cacheExchange(cacheConfig),
    authExchange(async (utils) => {
      const token = await auth0Client.getAccessTokenSilently();

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
