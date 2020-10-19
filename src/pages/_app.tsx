import withApollo from 'next-with-apollo';
import { ApolloProvider } from '@apollo/react-hooks';
import App from 'next/app';
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

MyApp.getInitialProps = async (appContext) => {
  const appProps = await App.getInitialProps(appContext);
  return { ...appProps };
};

export default withApollo(({ initialState }) => {
  client.cache.restore(initialState || {});
  return client;
})(MyApp);
