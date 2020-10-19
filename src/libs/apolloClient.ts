import ApolloClient, { InMemoryCache } from 'apollo-boost';
import Cookies from 'js-cookie';

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: process.env.API_GRAPHQL_URL,
  headers: {
    authorization: `Bearer ${Cookies.get('@ImoveisDeLuxoAdm:token')}` || null,
  },
});
