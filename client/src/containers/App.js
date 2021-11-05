import React from 'react';
import {
  ApolloClient,
  ApolloProvider,
  from,
  HttpLink,
  InMemoryCache,
} from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import Books from '../components/Books';
import Authors from '../components/Authors';
import './App.css';

function App() {
  const errorLink = onError(({ graphqlErrors, networkError }) => {
    if (graphqlErrors) {
      graphqlErrors.map(({ message, location, path }) => {
        return alert(`GraphQL error ${message}`);
      });
    }
  });

  const link = from([
    errorLink,
    new HttpLink({ uri: 'http://localhost:5000/graphql' }),
  ]);

  const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: link,
  });
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <div className="wrapper">
          <Books />
          <Authors />
        </div>
      </div>
    </ApolloProvider>
  );
}

export default App;
