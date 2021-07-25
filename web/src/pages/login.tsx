import { Container } from '@material-ui/core';
import React from 'react';
import LoginForm from '../components/forms/LoginForm';
import { withApollo } from '../utils/withApollo';

const LoginPage: React.FC = () => {
  return (
    <Container component="main" maxWidth="xs">
      <LoginForm />
    </Container>
  );
};

export default withApollo()(LoginPage);
