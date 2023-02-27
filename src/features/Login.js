import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../store/slice/userSlice";

import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

import {
  InputAdornment,
  Container,
  Typography,
  Box,
  IconButton,
  Link,
  TextField,
  Button,
  Avatar
} from "@mui/material";
/* import Visibility from "@material-ui/icons/Visibility"; */
/* import VisibilityOff from "@material-ui/icons/VisibilityOff"; */

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="white"
      marginBottom="40px"
      borderRadius="5px"
      align="center"
      {...props}
      sx={{ bgcolor: "gray", opacity: 0.9, width: "300px" }}
    >
      {"Dev By  "}
      <Link color="inherit" href="#">
        Fabio Conti
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function Login() {
  const emailValue = useRef(null);
  const passwordValue = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);

  const handleSubmit = (event) => {
    event.preventDefault();
    const email = emailValue.current.value;
    const password = passwordValue.current.value;

    dispatch(getUser({ email, password }));
  };

  useEffect(() => {
    if (user.name) {
      navigate("landing");
    }
  }, [dispatch, user]);

  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={{
        width: "100%",
        height: "900px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
      }}
    >
      <Box
        sx={{
          margin: "50px",
          padding: "8px",
          borderRadius: "5px",
          opacity: 0.95,
          bgcolor: "#f9fbe7",
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5" color="primary">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            sx={{ input: { backgroundColor: "white" } }}
            /* defaultValue="cupertinod" */
            id="email"
            inputRef={emailValue}
            type="email"
            label="email"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            sx={{ input: { backgroundColor: "white" } }}
            fullWidth
            inputRef={passwordValue}
            name="password"
            label="Password"
            type={showPassword ? "text" : "password"}
            id="password"
            autoComplete="current-password"
            /*  InputProps={{
              // <-- This is where the toggle button is added.
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              )
            }} */
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
        </Box>
      </Box>
      <Copyright sx={{ mt: 4, mb: 4 }} />
    </Container>
  );
}
