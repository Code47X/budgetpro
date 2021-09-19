import { ApolloCache } from '@apollo/client';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Avatar, Button, Grid, Paper, Typography } from '@mui/material';
import { Form, Formik, FormikHelpers } from 'formik';
import { useRouter } from 'next/router';
import React from 'react';
import * as Yup from 'yup';
import { MeDocument, MeQuery, useCreateUserMutation, User } from '../../../generated/graphql';
import { FormikTextField } from '../../UI/TextField';
import { sx } from './SignUpForm.styles';

interface FormValues {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

// Stores existing emails for validation checks
// when server responds with "email already in use"
const emailsInUse: string[] = [];

const formSchema = Yup.object({
  firstName: Yup.string().default('').trim().max(30, 'Too long').required('Required'),
  lastName: Yup.string().default('').trim().max(30, 'Too long').required('Required'),
  email: Yup.string()
    .default('')
    .trim()
    .email('Invalid email')
    .test('already-exists', 'Email already exists', function (value) {
      return value ? !emailsInUse.includes(value.toLowerCase()) : true;
    })
    .required('Required'),
  password: Yup.string().default('').min(6, 'Must be at least 6 characters').required('Required'),
});

function SignUpForm() {
  const router = useRouter();
  const [createUser] = useCreateUserMutation();
  const initialValues = formSchema.cast({}) as FormValues;

  const updateCache = (cache: ApolloCache<any>, user?: User | null) => {
    if (user) {
      cache.writeQuery<MeQuery>({
        query: MeDocument,
        data: {
          __typename: 'Query',
          me: user,
        },
      });
    }
  };

  const handleSubmit = async (values: FormValues, helpers: FormikHelpers<FormValues>) => {
    const castValues = formSchema.cast(values);
    helpers.setValues(castValues);

    const { data } = await createUser({
      variables: { input: castValues },
      update: (cache, { data }) => updateCache(cache, data?.createUser.user),
    });

    if (data?.createUser.user) {
      router.push('/');
    }
    if (data?.createUser.error) {
      emailsInUse.push(castValues.email.toLowerCase());
      helpers.validateField('email');
    }
  };

  return (
    <Paper sx={sx.wrapper}>
      <Avatar sx={sx.avatar}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5" sx={sx.header}>
        Sign up
      </Typography>
      <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={formSchema}>
        {({ isSubmitting, isValid, submitCount }) => (
          <Form>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <FormikTextField name="firstName" trimOnBlur fullWidth />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormikTextField name="lastName" trimOnBlur fullWidth />
              </Grid>
              <Grid item xs={12}>
                <FormikTextField name="email" trimOnBlur fullWidth />
              </Grid>
              <Grid item xs={12}>
                <FormikTextField name="password" type="password" fullWidth />
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  color="primary"
                  variant="contained"
                  disabled={isSubmitting || (submitCount > 0 && !isValid)}
                  fullWidth
                >
                  Create Account
                </Button>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </Paper>
  );
}

export default SignUpForm;
