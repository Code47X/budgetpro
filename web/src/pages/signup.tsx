import { Container } from '@material-ui/core';
import React from 'react';
import SignUpForm from '../components/forms/SignUpForm';
import { UserCard } from '../components/UI/UserCard';
import { withApollo } from '../utils/withApollo';

const SignUpPage: React.FC = () => {
  return (
    <>
      <Container component="main" maxWidth="xs">
        <SignUpForm />
      </Container>

      <UserCard />
    </>
  );
};

export default withApollo()(SignUpPage);
