import React, { useState } from "react";

import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import { useHistory } from "react-router-dom";
import Alert from "@material-ui/lab/Alert";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import CircularProgress from "@material-ui/core/CircularProgress";

import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { signIn } from "../AuthSlice";
import { unwrapResult } from "@reduxjs/toolkit";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function SignIn() {
  const [isWrong, setIsWrong] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const isLoading = useSelector((state) => state.auth.isLoading);
  const loginTime = useSelector((state) => state.auth.loginTime);

  const onSubmitHandle = async (data) => {
    try {
      const result = await dispatch(signIn(data));
      const res = unwrapResult(result);
      console.log(loginTime);
      localStorage.setItem("token", res.access_token);
      history.push("/home");
    } catch (error) {
      setIsWrong(true);
    }
  };

  const { register, handleSubmit } = useForm();
  const classes = useStyles();
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form
          onSubmit={handleSubmit(onSubmitHandle)}
          className={classes.form}
          noValidate
        >
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="UserName"
            name="username"
            autoComplete="username"
            autoFocus
            {...register("username")}
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
            {...register("password")}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          {isLoading && <CircularProgress />}
          {isWrong && (
            <Alert severity="error">Sai tên tài khoản hoặc mật khẩu!</Alert>
          )}
        </form>
      </div>
    </Container>
  );
}

export default SignIn;
