import withApollo from 'next-with-apollo';
import { ApolloProvider } from '@apollo/react-hooks';
import ThemeContainer from '../contexts/theme/ThemeContainer';
import ContextProvider from '../contexts/hooks';
import { client } from '../libs/apolloClient';

function MyApp({ Component, pageProps, apollo }): JSX.Element {
  return (
    <ApolloProvider client={apollo}>
      <ThemeContainer>
        <ContextProvider>
          <Component {...pageProps} />
        </ContextProvider>
      </ThemeContainer>
    </ApolloProvider>
  );
}

export default withApollo(({ initialState }) => {
  client.cache.restore(initialState || {});
  return client;
})(MyApp);
