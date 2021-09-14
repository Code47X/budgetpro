import { Container } from '@mui/material';
import React from 'react';
import LoginForm from '../components/forms/LoginForm';
import { withApollo } from '../utils/withApollo';

function LoginPage() {
  return (
    <Container component="main" maxWidth="xs">
      <LoginForm />
    </Container>
  );
}

export default withApollo()(LoginPage);
