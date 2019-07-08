import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { ApolloProvider } from "react-apollo";
import ApolloClient from "apollo-client";

import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { WebSocketLink } from "apollo-link-ws";
import { split } from "apollo-link";
import { getMainDefinition } from "apollo-utilities"

// const wsLink = new HttpLink({
const wsLink = new WebSocketLink({
  uri: `ws://localhost:4000/graphql`,
  // uri: 'http://localhost:4000/',
  options: {
    reconnect: true
  }
});

const cache = new InMemoryCache();
const httplink = new HttpLink({
  uri: 'http://localhost:4000/graphql'
});

const link = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
  },
  wsLink,
  httplink
);

const client = new ApolloClient({
  cache,
  link
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
  , document.getElementById('root'));

