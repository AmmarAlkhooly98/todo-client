import { useState } from "react";
import { Grid, TextField, Paper, Button, Typography } from "@mui/material";
import { signupAction } from "../redux/actions/users";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    userData[e.target.name] = e.target.value;
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    await dispatch(signupAction(userData))
      .then(() => navigate("/login"))
      .catch((e) => console.error(e));
  };

  return (
    <Grid container>
      <Grid item xs={10} md={6} lg={5} style={{ margin: "70px auto 0px auto" }}>
        <Paper>
          <form onSubmit={handleSignup}>
            <Grid
              container
              spacing={3}
              direction={"column"}
              justify={"center"}
              alignItems={"center"}
            >
              <Grid item xs={12}>
                <Typography variant="h4">Sign up</Typography>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="firstName"
                  required
                  onChange={handleInputChange}
                  label="First Name"
                ></TextField>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="lastName"
                  required
                  onChange={handleInputChange}
                  label="Last Name"
                ></TextField>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="email"
                  onChange={handleInputChange}
                  required
                  label="Email"
                  type={"email"}
                ></TextField>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="password"
                  onChange={handleInputChange}
                  required
                  label="Password"
                  type={"password"}
                ></TextField>
              </Grid>
              <Grid item xs={12} style={{ marginBottom: 15 }}>
                <Button type="submit" fullWidth>
                  Sign Up
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Signup;
