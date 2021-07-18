import { Container } from '@material-ui/core';
import React from 'react';
import LoginForm from '../components/forms/LoginForm';

const LoginPage: React.FC = () => {
  return (
    <Container component="main" maxWidth="xs">
      <LoginForm />
    </Container>
  );
};

export default LoginPage;
