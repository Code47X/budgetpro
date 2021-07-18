import { Container } from '@material-ui/core';
import React from 'react';
import SignUpForm from '../components/forms/SignUpForm';

const SignUpPage: React.FC = () => {
  return (
    <Container component="main" maxWidth="xs">
      <SignUpForm />
    </Container>
  );
};

export default SignUpPage;
