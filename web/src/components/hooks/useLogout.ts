import { useApolloClient } from '@apollo/client';
import { useRouter } from 'next/router';
import { useLogoutMutation } from '../../generated/graphql';

export function useLogout() {
  const apollo = useApolloClient();
  const router = useRouter();

  const [logout] = useLogoutMutation({
    onCompleted: async () => {
      if (router.route === '/') {
        await apollo.resetStore();
      } else {
        await apollo.clearStore();
        router.push('/');
      }
    },
  });

  return logout;
}
