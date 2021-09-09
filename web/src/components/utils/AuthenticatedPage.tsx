import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useCurrentUser } from '../hooks/useCurrentUser';

export const AuthenticatedPage: React.FC = ({ children }) => {
  const { currentUser, loading } = useCurrentUser();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !currentUser) {
      router.replace('/login');
    }
  }, [currentUser, loading, router]);

  return currentUser ? <>{children}</> : <></>;
};
