import React from "react";
import App from "./App";
// import ApolloClient from "apollo-client";
// import { InMemoryCache } from "apollo-cache-inmemory";
// import { createHttpLink } from "apollo-link";
import { setContext } from "apollo-link-context";
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";

const httpLink = createHttpLink({
  uri: "http://localhost:5000/graphql",
});

const authLink = setContext(() => {
  const token = localStorage.getItem("jwtToken");
  return {
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);
