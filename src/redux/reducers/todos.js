import {
  FETCH_TODO,
  CREATE_TODO,
  UPDATE_TODO,
  UPDATE_COMPLETED_TODO,
  DELETE_TODO,
} from "../constants";

let initialState = {
  todos: [],
};

const todoReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_TODO:
      return {
        ...state,
        todos: action.payload,
      };
    case CREATE_TODO:
      return {
        ...state,
        todos: [...state.todos, action.payload],
      };
    case UPDATE_TODO:
      let todoIndex = state.todos.findIndex((t) => t.id === action.payload.id);
      let updatedTodos = state.todos.map((t, i) => {
        if (i === todoIndex) return action.payload;
        else return t;
      });
      return {
        ...state,
        todos: updatedTodos,
      };
    case UPDATE_COMPLETED_TODO:
      let compTodoIndex = state.todos.findIndex(
        (t) => t.id === action.payload.id
      );
      let updatedCompTodos = state.todos.map((t, i) => {
        if (i === compTodoIndex) return action.payload;
        else return t;
      });
      console.log(updatedCompTodos);
      return {
        ...state,
        todos: updatedCompTodos,
      };
    case DELETE_TODO:
      return {
        ...state,
        todos: state.todos.filter((t) => t.id !== action.payload),
      };
    default:
      return state;
  }
};

export default todoReducer;
