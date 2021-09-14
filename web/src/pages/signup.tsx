import { Container } from '@mui/material';
import React from 'react';
import SignUpForm from '../components/forms/SignUpForm';
import { withApollo } from '../utils/withApollo';

function SignUpPage() {
  return (
    <Container component="main" maxWidth="xs">
      <SignUpForm />
    </Container>
  );
}

export default withApollo()(SignUpPage);
