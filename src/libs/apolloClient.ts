import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  ApolloLink,
  concat,
} from '@apollo/react-hooks';
// import ApolloClient, { InMemoryCache } from 'apollo-boost';
import Cookies from 'js-cookie';

const authMiddleware = new ApolloLink((operation, forward) => {
  // add the authorization to the headers
  operation.setContext({
    headers: {
      authorization: `Bearer ${Cookies.get('@ImoveisDeLuxoAdm:token')}` || null,
    },
  });

  return forward(operation);
});

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  ssrMode: typeof window === 'undefined',
  link: concat(
    authMiddleware,
    new HttpLink({ uri: process.env.API_GRAPHQL_URL }),
  ),
});
