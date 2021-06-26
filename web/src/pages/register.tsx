import React from "react";
import { Form, Formik } from "formik";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Avatar, Typography } from "@material-ui/core";
import LinearProgress from "@material-ui/core/LinearProgress";

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
      width: "100%", // Fix IE 11 issue.
      marginTop: spacing(3),
    },
    submitBtn: {
      margin: spacing(1, 0, 1),
    },
  })
);

const RegisterPage: React.FC = () => {
  const cn = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          email: "",
          password: "",
        }}
        onSubmit={async (values) => {
          console.log(values);
        }}
      >
        {({ values, touched, errors, handleChange, isSubmitting }) => (
          <div className={cn.formContainer}>
            <Avatar className={cn.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <Form className={cn.form}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    id="firstName"
                    name="firstName"
                    label="First name"
                    value={values.firstName}
                    onChange={handleChange}
                    error={touched.firstName && Boolean(errors.firstName)}
                    helperText={touched.firstName && errors.firstName}
                    variant="outlined"
                    size="small"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    id="lastName"
                    name="lastName"
                    label="Last name"
                    value={values.lastName}
                    onChange={handleChange}
                    error={touched.lastName && Boolean(errors.lastName)}
                    helperText={touched.lastName && errors.lastName}
                    variant="outlined"
                    size="small"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="email"
                    name="email"
                    label="Email"
                    value={values.email}
                    onChange={handleChange}
                    error={touched.email && Boolean(errors.email)}
                    helperText={touched.email && errors.email}
                    variant="outlined"
                    size="small"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="password"
                    name="password"
                    label="Password"
                    type="password"
                    value={values.password}
                    onChange={handleChange}
                    error={touched.password && Boolean(errors.password)}
                    helperText={touched.password && errors.password}
                    variant="outlined"
                    size="small"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    fullWidth
                    color="primary"
                    variant="contained"
                    type="submit"
                    disabled={isSubmitting}
                    className={cn.submitBtn}
                  >
                    Create account
                  </Button>
                </Grid>
                {isSubmitting && (
                  <Grid item xs={12}>
                    <LinearProgress color="primary" />
                  </Grid>
                )}
              </Grid>
            </Form>
          </div>
        )}
      </Formik>
    </Container>
  );
};

export default RegisterPage;
