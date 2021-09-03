import { Avatar, Button, Fade, Grid, LinearProgress, Typography } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { Form, Formik, FormikHelpers } from 'formik';
import { useRouter } from 'next/router';
import React from 'react';
import * as Yup from 'yup';
import { MeDocument, MeQuery, useLoginMutation } from '../../generated/graphql';
import { FormikTextField } from '../inputs/FormikTextField';

const useStyles = makeStyles(({ spacing, palette }: Theme) => ({
  container: {
    marginTop: spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: spacing(1),
    backgroundColor: palette.primary.main,
  },
  form: {
    width: '100%',
    marginTop: spacing(3),
  },
  submitBtn: {
    margin: spacing(1, 0, 1),
  },
}));

interface LoginFormValues {
  email: string;
  password: string;
}

// Form Validation
const loginSchema = Yup.object({
  email: Yup.string().default('').trim().email('Invalid email').required('Required'),
  password: Yup.string().default('').required('Required'),
});

const LoginForm: React.FC = () => {
  const classes = useStyles();
  const router = useRouter();
  const [login] = useLoginMutation();
  const initialValues: LoginFormValues = loginSchema.cast({});

  const handleSubmit = async (values: LoginFormValues, helpers: FormikHelpers<LoginFormValues>) => {
    const castValues = loginSchema.cast(values);
    helpers.setValues(castValues);

    const { data } = await login({
      variables: { input: castValues },
      update: (cache, { data }) => {
        if (data?.login.user) {
          cache.writeQuery<MeQuery>({
            query: MeDocument,
            data: {
              __typename: 'Query',
              me: data?.login.user,
            },
          });
        }
      },
    });

    if (data?.login.user) {
      router.push('/');
    }
    if (data?.login.error) {
      helpers.setFieldError('password', data.login.error.message);
    }
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={loginSchema}>
      {({ isSubmitting, isValid, submitCount }) => (
        <div className={classes.container}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Log in
          </Typography>
          <Form className={classes.form}>
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
                  className={classes.submitBtn}
                  fullWidth
                >
                  Log in
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Fade in={isSubmitting} timeout={500}>
                  <LinearProgress color="primary" />
                </Fade>
              </Grid>
            </Grid>
          </Form>
        </div>
      )}
    </Formik>
  );
};

export default LoginForm;
