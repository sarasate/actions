import { createApp } from "vue";
import { createPinia } from "pinia";
import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client/core";
import { DefaultApolloClient } from "@vue/apollo-composable";

import App from "./App.vue";
import router from "./router";

import "./assets/main.css";

const app = createApp(App);

// HTTP connection to the API
const httpLink = createHttpLink({
  // You should use an absolute URL here
  uri: "http://localhost:3020/graphql",
});

// Cache implementation
const cache = new InMemoryCache();

// Create the apollo client
const apolloClient = new ApolloClient({
  link: httpLink,
  cache,
});

app.use(createPinia());
app.provide(DefaultApolloClient, apolloClient);
app.use(router);

app.mount("#app");
