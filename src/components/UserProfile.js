import { Grid, Paper, Typography } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import Avatar from "@mui/material/Avatar";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUserAction } from "../redux/actions/users";
import Todos from "./Todos";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}));

const UserProfile = () => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.user);
  useEffect(() => {
    dispatch(fetchUserAction());
  }, []);

  return (
    <div>
      {user ? (
        <Grid container>
          <Grid item xs={12} md={6}>
            <Paper
              style={{
                width: "30vw",
                height: "80vh",
                margin: "20px 10px 0 20px",
              }}
            >
              <Grid container spacing={0}>
                <Grid item xs={12} style={{ margin: "20px" }}>
                  <StyledBadge
                    overlap="circular"
                    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                    variant="dot"
                  >
                    <Avatar
                      sx={{
                        width: 150,
                        height: "auto",
                      }}
                      alt={user.first_name}
                      src={user?.image}
                    />
                  </StyledBadge>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="h2">
                    {user.first_name + " " + user.last_name}
                  </Typography>
                  <Typography variant="h4">{user.email}</Typography>
                  <Typography variant="h6">
                    member since: {new Date(user.createdAt).toDateString()}
                  </Typography>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            style={{ position: "relative", right: "150px" }}
          >
            <Typography variant="h2">Your todos:</Typography>
            <Todos />
          </Grid>
        </Grid>
      ) : (
        <CircularProgress />
      )}
    </div>
  );
};

export default UserProfile;
