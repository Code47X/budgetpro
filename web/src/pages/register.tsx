import {
  Avatar,
  Button,
  Container,
  Fade,
  Grid,
  LinearProgress,
  Typography,
} from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { Form, Formik } from "formik";
import React from "react";
import * as Yup from "yup";
import { FormikTextField } from "../components/UI/FormikTextField";
import { useRegisterUserMutation } from "../generated/graphql";

const useStyles = makeStyles(({ spacing, palette }: Theme) =>
  createStyles({
    formContainer: {
      marginTop: spacing(8),
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    avatar: {
      margin: spacing(1),
      backgroundColor: palette.primary.main,
    },
    form: {
      width: "100%",
      marginTop: spacing(3),
    },
    submitBtn: {
      margin: spacing(1, 0, 1),
    },
  })
);

// This array is just used for a yup email validation test
// when the server responds with "email already in use"
const emailsInUse: string[] = [];

// Form Validation
const registerSchema = Yup.object().shape({
  firstName: Yup.string().trim().max(30, "Too long").required("Required"),
  lastName: Yup.string().trim().max(30, "Too long").required("Required"),
  email: Yup.string()
    .trim()
    .email("Invalid email")
    .required("Required")
    .test("email-already-exists", "Email already exists", function (value) {
      if (value) {
        return !emailsInUse.includes(value.toLowerCase());
      }
      return true;
    }),
  password: Yup.string()
    .min(6, "Must be at least 6 characters")
    .required("Required"),
});

const RegisterPage: React.FC = () => {
  const classes = useStyles();
  const [registerMutation] = useRegisterUserMutation();

  return (
    <Container component="main" maxWidth="xs">
      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          email: "",
          password: "",
        }}
        onSubmit={async (values, { setFieldError }) => {
          registerMutation({
            variables: {
              input: values,
            },
          }).then((res) => {
            if (res.data?.register.__typename === "EmailAlreadyExists") {
              setFieldError("email", "Email already exists");
              emailsInUse.push(values.email);
            }
            if (res.data?.register.__typename === "User") {
              // WIP - Redirect
              console.log("User Registered:");
              console.log(res.data.register);
            }
          });
        }}
        validationSchema={registerSchema}
      >
        {({ isSubmitting, submitForm, isValid, submitCount }) => (
          <div className={classes.formContainer}>
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
                  <FormikTextField
                    name="email"
                    type="email"
                    trimOnBlur
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormikTextField name="password" type="password" fullWidth />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    fullWidth
                    color="primary"
                    variant="contained"
                    disabled={isSubmitting || (submitCount > 0 && !isValid)}
                    className={classes.submitBtn}
                    onClick={() => submitForm()}
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
    </Container>
  );
};

export default RegisterPage;
