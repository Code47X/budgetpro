import { Container } from '@mui/material';
import React from 'react';
import BudgetSheet from '../../components/containers/BudgetSheet';
import { UserCard } from '../../components/containers/UserCard';
import { AuthenticatedPage } from '../../components/utils/AuthenticatedPage';
import { withApollo } from '../../utils/withApollo';

const BudgetPage: React.FC = () => {
  return (
    <AuthenticatedPage>
      <Container component="main" maxWidth="md">
        <BudgetSheet />
        <UserCard />
      </Container>
    </AuthenticatedPage>
  );
};

export default withApollo()(BudgetPage);
