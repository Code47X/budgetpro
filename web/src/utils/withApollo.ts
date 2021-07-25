import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { NextPageContext } from 'next';
import { withApollo as createWithApollo } from 'next-apollo';

function createClient(ctx: NextPageContext | undefined) {
  return new ApolloClient({
    link: createHttpLink({
      uri: 'http://localhost:4000/graphql',
      credentials: 'include',
      headers: {
        cookie: ctx?.req?.headers.cookie,
      },
    }),
    cache: new InMemoryCache(),
  });
}

export const withApollo = createWithApollo(createClient);
