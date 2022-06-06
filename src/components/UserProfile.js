import { Grid, Paper, Typography } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import Avatar from "@mui/material/Avatar";
import Badge from "@mui/material/Badge";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUserAction, updatePhotoAction } from "../redux/actions/users";
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

  const [open, setOpen] = useState(false);
  const [userPhoto, setUserPhoto] = useState(null);

  const handelChange = (e) => {
    setUserPhoto(e.target.files[0]);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = async () => {
    const formData = new FormData();
    formData.append("file", userPhoto);
    try {
      dispatch(updatePhotoAction(formData));
      setOpen(false);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div>
      {user ? (
        <Grid container>
          <Grid item xs={12}>
            <Paper
              style={{
                // width: "30vw",
                // height: "80vh",
                margin: "30px 20px 30px 30px",
                padding: "20px",
              }}
            >
              <Grid container spacing={0}>
                <Grid item xs={12} style={{ margin: "20px" }}>
                  <StyledBadge
                    overlap="circular"
                    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                    variant="dot"
                    onClick={handleClickOpen}
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
                  <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>Edit Todo</DialogTitle>
                    <DialogContent>
                      <TextField
                        autoFocus
                        margin="dense"
                        name="name"
                        label="todo"
                        type="file"
                        fullWidth
                        variant="standard"
                        onChange={handelChange}
                      />
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={handleClose}>Save photo</Button>
                    </DialogActions>
                  </Dialog>
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
          <Grid item xs={12}>
            <Paper
              style={{
                margin: "0 20px 30px 20px",
                padding: "30px",
              }}
            >
              <Todos />
            </Paper>
          </Grid>
        </Grid>
      ) : (
        <CircularProgress />
      )}
    </div>
  );
};

export default UserProfile;
