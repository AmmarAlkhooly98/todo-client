import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginAction } from "../redux/actions/users";
import {
  Checkbox,
  Grid,
  TextField,
  FormControlLabel,
  Paper,
  Button,
  Typography,
} from "@mui/material";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [checked, setChecked] = useState(false);
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    userData[e.target.name] = e.target.value;
    console.log(userData);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    await dispatch(loginAction(userData))
      .then(() => navigate("/todos"))
      .catch((e) => console.error(e));
  };

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  return (
    <Grid container>
      <Grid item xs={10} md={6} lg={5} style={{ margin: "70px auto 0px auto" }}>
        <Paper>
          <form onSubmit={handleLogin}>
            <Grid
              container
              spacing={3}
              direction={"column"}
              justify={"center"}
              alignItems={"center"}
            >
              <Grid item xs={12}>
                <Typography variant="h4">Login</Typography>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="email"
                  label="Email"
                  type={"email"}
                  onChange={handleInputChange}
                ></TextField>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="password"
                  label="Password"
                  type={"password"}
                  onChange={handleInputChange}
                ></TextField>
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={checked}
                      onChange={handleChange}
                      label={"Keep me logged in"}
                      inputProps={{ "aria-label": "primary checkbox" }}
                    />
                  }
                  label="Keep me logged in"
                />
              </Grid>
              <Grid item xs={12} style={{ marginBottom: 15 }}>
                <Button fullWidth type="submit">
                  {" "}
                  Login{" "}
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Login;
