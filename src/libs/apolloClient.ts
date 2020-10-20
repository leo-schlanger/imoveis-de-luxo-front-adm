import {
  ApolloClient,
  InMemoryCache,
  ApolloLink,
  HttpLink,
} from 'apollo-boost';
import Cookies from 'js-cookie';
import fetch from 'isomorphic-unfetch';

export const client = new ApolloClient({
  ssrMode: typeof window === 'undefined',
  cache: new InMemoryCache(),
  link: new ApolloLink((operation, forward) => {
    operation.setContext({
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
        'Access-Control-Allow-Headers':
          'Content-Type, Authorization, Content-Length, X-Requested-With',
        authorization:
          `Bearer ${Cookies.get('@ImoveisDeLuxoAdm:token')}` || null,
      },
    });
    return forward(operation);
  }).concat(
    new HttpLink({
      uri: process.env.API_GRAPHQL_URL,
      fetch,
    }),
  ),
});
