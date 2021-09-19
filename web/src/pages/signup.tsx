import { Container } from '@mui/material';
import React from 'react';
import SignUpForm from '../components/forms/SignUpForm';
import { withApollo } from '../utils/withApollo';

function SignUpPage() {
  return (
    <Container component="main" maxWidth="xs" sx={{ py: 8 }}>
      <SignUpForm />
    </Container>
  );
}

export default withApollo()(SignUpPage);
