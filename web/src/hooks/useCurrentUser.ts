import { useMeQuery } from '../generated/graphql';

export function useCurrentUser() {
  const { data, loading } = useMeQuery();

  return { currentUser: data?.me, loading };
}
