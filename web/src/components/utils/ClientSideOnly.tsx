import React from 'react';
import { useHasMounted } from '../hooks/useHasMounted';

export const ClientSideOnly: React.FC = ({ children }) => {
  const hasMounted = useHasMounted();

  if (!hasMounted) {
    return null;
  }

  return <React.Fragment>{children}</React.Fragment>;
};
