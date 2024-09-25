import React, { useState } from "react";
import {
  Grid,
  Paper,
  Avatar,
  TextField,
  Button,
  CircularProgress,
  Stack,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { login } from "../../functions";
import Toast from "../Toast";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();
  const onSubmit = async (e) => {
    e.preventDefault();

    if (!loading) {
      setLoading(true);
    }
    let logging = await login(credentials.username, credentials.password);
    if (loading) {
      setLoading(false);
    }
    if (logging.success) {
      toast.success(logging.message);
      console.log(logging);
      localStorage.setItem("token", logging.token);
      localStorage.setItem("admin", logging.admin.username);
      setTimeout(() => {
        navigate("/");
        window.location.reload();
      }, 3500);
    } else {
      setLoading(false);
      toast.error(logging.message);
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const paperStyle = {
    padding: 20,
    height: "50vh",
    width: 300,
    margin: "20px auto",
  };
  const avatarStyle = { backgroundColor: "primary.main" };
  const btnstyle = { margin: "8px 0" };
  return (
    <>
      <Grid mt={4}>
        <Paper elevation={10} style={paperStyle}>
          <Grid align="center">
            <Avatar sx={avatarStyle}>
              <LockOutlinedIcon />
            </Avatar>
            <h2>Sign In</h2>
          </Grid>
          <form onSubmit={onSubmit}>
            <TextField
              label="Username"
              placeholder="Enter Username"
              fullWidth
              required
              sx={{ my: 1 }}
              name="username"
              value={credentials.username}
              onChange={onChange}
            />
            <TextField
              label="Password"
              placeholder="Enter password"
              type="password"
              fullWidth
              required
              sx={{ my: 1 }}
              name="password"
              value={credentials.password}
              onChange={onChange}
            />
            <Stack spacing={2} sx={{ alignItems: "center" }}>
              <Button
                type="submit"
                color="primary"
                variant="contained"
                disabled={loading}
                style={btnstyle}
                fullWidth
              >
                Login
              </Button>

              {loading && <CircularProgress size={24} />}
            </Stack>
          </form>
        </Paper>
        <Toast />
      </Grid>
    </>
  );
};

export default Login;
