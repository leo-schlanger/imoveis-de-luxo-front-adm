import {
  ApolloClient,
  InMemoryCache,
  ApolloLink,
  HttpLink,
} from 'apollo-boost';
import Cookies from 'js-cookie';

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new ApolloLink((operation, forward) => {
    operation.setContext({
      headers: {
        authorization:
          `Bearer ${Cookies.get('@ImoveisDeLuxoAdm:token')}` || null,
      },
    });
    return forward(operation);
  }).concat(
    new HttpLink({
      uri: process.env.API_GRAPHQL_URL,
    }),
  ),
});
