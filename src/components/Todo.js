import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  completedTodoAction,
  editTodoAction,
  deleteTodoAction,
} from "../redux/actions/todos";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";
import Typography from "@mui/material/Typography";
import AddTaskRoundedIcon from "@mui/icons-material/AddTaskRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Grid from "@mui/material/Grid";
import Switch from "@mui/material/Switch";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const Todo = ({ todo }) => {
  const dispatch = useDispatch();

  const [expanded, setExpanded] = useState(false);
  const [open, setOpen] = useState(false);
  const [todoData, setTodoData] = useState({
    name: todo.name,
    description: todo.description,
    completed: todo.completed,
  });

  const handelChange = (e) => {
    setTodoData({
      ...todoData,
      [e.target.name]:
        e.target.name !== "completed" ? e.target.value : e.target.checked,
    });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = async () => {
    let updatedTodo = {
      ...todo,
      name: todoData.name,
      description: todoData.description,
      completed: todoData.completed,
    };
    await dispatch(editTodoAction(todo.id, updatedTodo))
      .then(() => {
        setOpen(false);
      })
      .catch((e) => console.error(e));
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handelDelete = () => {
    dispatch(deleteTodoAction(todo.id));
  };

  const handelCompleted = async () => {
    todoData.completed = !todoData.completed;
    dispatch(completedTodoAction(todo.id, { ...todo, ...todoData }));
  };

  return (
    <Grid
      item
      xs={12}
      md={6}
      lg={4}
      style={{
        display: "flex",
        justifyContent: "space-evenly",
        alignItems: "center",
      }}
    >
      <Card
        elevation={4}
        sx={{
          maxWidth: 345,
          minWidth: 345,
          margin: "20px",
        }}
      >
        <CardHeader
          subheader={new Date(todo.createdAt || new Date()).toDateString()}
        />
        <CardContent>
          <Typography
            variant="h4"
            color="text.secondary"
            style={{
              textDecorationLine: todo.completed ? "line-through" : "normal",
              textDecorationStyle: "solid",
            }}
          >
            {todo.name}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton
            aria-label="delete todo"
            onClick={() => handelDelete(todo.id)}
          >
            <DeleteForeverRoundedIcon />
          </IconButton>
          <IconButton
            aria-label="mark completed"
            onChange={handelChange}
            onClick={() => handelCompleted(todo.id)}
          >
            <AddTaskRoundedIcon />
          </IconButton>
          <IconButton aria-label="mark completed" onClick={handleClickOpen}>
            <EditRoundedIcon />
          </IconButton>
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography variant="h6">task description:</Typography>
            <Typography paragraph style={{ whiteSpace: "pre-line" }}>
              {todo.description}
            </Typography>
          </CardContent>
        </Collapse>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Edit Todo</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              name="name"
              label="todo"
              type="text"
              fullWidth
              variant="standard"
              value={todoData.name}
              onChange={handelChange}
            />
            <TextField
              margin="dense"
              name="description"
              label="description"
              type="text"
              multiline
              rows={3}
              fullWidth
              variant="standard"
              value={todoData.description}
              onChange={handelChange}
            />
            <Switch
              name="completed"
              checked={todoData.completed}
              onChange={handelChange}
              inputProps={{ "aria-label": "controlled" }}
            />
          </DialogContent>
          <DialogActions onClick={handleClose}>
            <Button>Save Edit</Button>
          </DialogActions>
        </Dialog>
      </Card>
    </Grid>
  );
};

export default Todo;
