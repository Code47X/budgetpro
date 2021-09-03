import { Avatar, Button, Fade, Grid, LinearProgress, Typography } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { Form, Formik, FormikHelpers } from 'formik';
import { useRouter } from 'next/router';
import React from 'react';
import * as Yup from 'yup';
import { MeDocument, MeQuery, useCreateUserMutation } from '../../generated/graphql';
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

interface SignUpFormValues {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

// Stores existing emails for validation checks
// when server responds with "email already in use"
const emailsInUse: string[] = [];

// Form Validation
const signupSchema = Yup.object({
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

const SignUpForm: React.FC = () => {
  const classes = useStyles();
  const router = useRouter();
  const [createUser] = useCreateUserMutation();
  const initialValues: SignUpFormValues = signupSchema.cast({});

  const handleSubmit = async (
    values: SignUpFormValues,
    helpers: FormikHelpers<SignUpFormValues>
  ) => {
    const castValues = signupSchema.cast(values);
    helpers.setValues(castValues);

    const { data } = await createUser({
      variables: { input: castValues },
      update: (cache, { data }) => {
        if (data?.createUser.user) {
          cache.writeQuery<MeQuery>({
            query: MeDocument,
            data: {
              __typename: 'Query',
              me: data?.createUser.user,
            },
          });
        }
      },
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
    <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={signupSchema}>
      {({ isSubmitting, isValid, submitCount }) => (
        <div className={classes.container}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Form className={classes.form}>
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
                  className={classes.submitBtn}
                  fullWidth
                >
                  Create Account
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

export default SignUpForm;
