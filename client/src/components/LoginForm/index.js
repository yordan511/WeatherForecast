import React, { useState, useEffect } from "react";
import { Formik } from "formik";
import { withRouter, Link } from "react-router-dom";
import * as Yup from "yup";
import {
  login,
  register,
  isUserAuthenticated,
} from "../../services/Authentication/index";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { FormHelperText } from "@material-ui/core";
import SnackbarNotification from "../SnackbarNotification";
import { FormErrorMessage } from "../ErrorMessage";

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
});

const useStyles = makeStyles((theme) => ({
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: theme.spacing(10),
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
    "& #component-error-text": {
      color: "red",
    },
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));
const defaultMessageState = {
  open: false,
  message: "",
};

const LoginForm = ({ type, history, location, ...rest }) => {
  const classes = useStyles();

  const [notification, setNotification] = useState({
    ...defaultMessageState,
    ...location.state,
  });

  const [serverError, setServerError] = useState({
    error: false,
    text: "",
  });

  useEffect(() => {
    if (isUserAuthenticated()) {
      history.push("/");
    }
  }, []);

  const handleNotificationClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setNotification(defaultMessageState);
  };

  const handleFormSubmit = async (values, actions) => {
    try {
      if (type === "login") {
        await login(values.email, values.password);
        if (isUserAuthenticated()) {
          history.push("/");
        }
      } else {
        await register(values.email, values.password);
        history.push({
          pathname: "login",
          state: {
            open: true,
            message: "Successful registration",
          },
        });
      }
      setServerError({ error: false, text: "" });
      actions.setSubmitting(false);
    } catch (e) {
      console.log(e);
      setServerError({ error: true, text: "Invalid login information" });
      actions.setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validationSchema={LoginSchema}
      onSubmit={handleFormSubmit}
      render={({
        values,
        touched,
        errors,
        isSubmitting,
        handleChange,
        handleBlur,
        handleSubmit,
      }) => (
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className={classes.paper}>
            <Typography component="h1" variant="h5">
              {type === "login" ? "Sign-in" : "Register"}
            </Typography>
            <form onSubmit={handleSubmit} className={classes.form}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
              />
              <FormErrorMessage
                errors={errors}
                touched={touched}
                field="email"
              />

              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
              />
              <FormErrorMessage
                errors={errors}
                touched={touched}
                field="password"
              />
              {serverError.error ? (
                <FormHelperText id="component-error-text">
                  {serverError.text}
                </FormHelperText>
              ) : null}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                {!isSubmitting ? type : <div>Loading</div>}
              </Button>
              <Grid container>
                <Grid item>
                  {type === "login" ? (
                    <Link to={"/register"} variant="body2">
                      Don't have an account? Sign Up
                    </Link>
                  ) : (
                    <Link to={"/login"} variant="body2">
                      Already have an account? Sign-in
                    </Link>
                  )}
                </Grid>
              </Grid>
            </form>
            <SnackbarNotification
              open={notification.open}
              message={notification.message}
              handleClose={handleNotificationClose}
            />
          </div>
          <Box mt={8}>
            <Copyright />
          </Box>
        </Container>
      )}
    />
  );
};

export default withRouter(LoginForm);

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="">
        Alcatraz Interview
      </Link>{" "}
      {new Date().getFullYear()}
    </Typography>
  );
}
