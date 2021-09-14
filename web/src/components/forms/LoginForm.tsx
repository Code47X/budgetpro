import { ApolloCache } from '@apollo/client/cache';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Avatar, Box, Button, Grid, Typography } from '@mui/material';
import { Form, Formik, FormikHelpers } from 'formik';
import { useRouter } from 'next/router';
import React from 'react';
import * as Yup from 'yup';
import { MeDocument, MeQuery, useLoginMutation, User } from '../../generated/graphql';
import { FormikTextField } from '../inputs/FormikTextField';

const sx = {
  container: {
    marginTop: 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    bgcolor: 'primary.main',
  },
  header: {
    my: 2,
  },
} as const;

interface FormValues {
  email: string;
  password: string;
}

const formSchema = Yup.object({
  email: Yup.string().default('').trim().email('Invalid email').required('Required'),
  password: Yup.string().default('').required('Required'),
});

function LoginForm() {
  const router = useRouter();
  const [login] = useLoginMutation();
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

    const { data } = await login({
      variables: { input: castValues },
      update: (cache, { data }) => updateCache(cache, data?.login.user),
    });

    if (data?.login.user) {
      router.push('/');
    }
    if (data?.login.error) {
      helpers.setFieldError('password', data.login.error.message);
    }
  };

  return (
    <Box sx={sx.container}>
      <Avatar sx={sx.avatar}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5" sx={sx.header}>
        Log in
      </Typography>
      <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={formSchema}>
        {({ isSubmitting, isValid, submitCount }) => (
          <Form>
            <Grid container spacing={2}>
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
                  Log in
                </Button>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </Box>
  );
}

export default LoginForm;
