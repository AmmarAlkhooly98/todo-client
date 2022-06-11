import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTodosAction, addTodoAction } from "../redux/actions/todos";
import Todo from "./Todo";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { Typography } from "@mui/material";

const Todos = () => {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todo.todos);
  const [todoData, setTodoData] = useState({
    name: "",
    description: "",
  });
  const [open, setOpen] = useState(false);

  const handelChange = (e) => {
    setTodoData({
      ...todoData,
      [e.target.name]: e.target.value,
    });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = async () => {
    await dispatch(addTodoAction(todoData))
      .then(() => {
        setOpen(false);
      })
      .catch((e) => console.error(e))
      .finally(() => {
        setTodoData({
          name: "",
          description: "",
        });
      });
  };

  useEffect(() => {
    const fetchTodos = async () => {
      await dispatch(fetchTodosAction());
    };
    fetchTodos();
  }, []);

  return (
    <Container>
      <Grid container spacing={8}>
        {todos?.length && Array.isArray(todos) ? (
          todos.map((todo, i) => <Todo key={i} todo={todo} />)
        ) : (
          <Grid container style={{ margin: "100px 30px 0 30px" }}>
            <Grid item xs={12}>
              <Typography variant="h4">
                You have no todos yet. Try creating a new todo from the add
                button below.
              </Typography>
            </Grid>
          </Grid>
        )}
      </Grid>
      <Grid container justify="flex-end" alignItems="flex-end">
        <Fab
          color="primary"
          aria-label="add"
          onClick={handleClickOpen}
          style={{ position: "fixed", bottom: 50, right: 150 }}
        >
          <AddIcon />
        </Fab>
      </Grid>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Todo</DialogTitle>
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
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Add</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Todos;
