import {
  ApolloProvider as Apollo,
  ApolloClient,
  InMemoryCache,
  HttpLink,
  ApolloLink,
  concat,
} from '@apollo/react-hooks';
import Cookies from 'js-cookie';

const ApolloProvider: React.FC = ({ children }) => {
  const authMiddleware = new ApolloLink((operation, forward) => {
    // add the authorization to the headers
    operation.setContext({
      headers: {
        authorization:
          `Bearer ${Cookies.get('@ImoveisDeLuxoAdm:token')}` || null,
      },
    });

    return forward(operation);
  });

  const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: concat(
      authMiddleware,
      new HttpLink({ uri: process.env.API_GRAPHQL_URL }),
    ),
  });

  return <Apollo client={client as ApolloClient<any>}>{children}</Apollo>;
};

export default ApolloProvider;
