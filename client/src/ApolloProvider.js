import React from "react";
import App from "./App";
import ApolloClient from "apollo-client";
import { InMemoryCashe } from "apollo-cashe-inmemory";
import { createHttp } from "apollo-link-http";
import { ApolloProvider } from "@apollo/react-hooks";

const httpLink = createHttpLink({
  url: "http://localhost:5000",
});

const client = new ApolloClient({
  link: httpLink,
  cashe: new InMemoryCashe(),
});

export default (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);
