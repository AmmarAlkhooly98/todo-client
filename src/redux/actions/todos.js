import {
  FETCH_TODO,
  CREATE_TODO,
  UPDATE_TODO,
  UPDATE_COMPLETED_TODO,
  DELETE_TODO,
} from "../constants";
import API_URLS from "../../api";
import { requestApi } from "../../helpers/index.js";

export const fetchTodosAction = () => async (dispatch) => {
  let data = {
    url: API_URLS().TODO.ROOT,
  };
  const response = await requestApi(data);
  dispatch({ type: FETCH_TODO, payload: response.data?.result?.todos });
};

export const addTodoAction = (todoData) => async (dispatch) => {
  let data = {
    url: API_URLS().TODO.ROOT,
    body: todoData,
    method: "POST",
  };
  await requestApi(data)
    .then((res) => {
      dispatch({
        type: CREATE_TODO,
        payload: { id: res?.data?.result?.id, completed: false, ...todoData },
      });
    })
    .catch((e) => console.error(e));
};

export const editTodoAction = (id, updatedTodo) => async (dispatch) => {
  let data = {
    url: API_URLS(id).TODO.BY_ID,
    method: "PUT",
    body: updatedTodo,
  };
  await requestApi(data)
    .then(() => dispatch({ type: UPDATE_TODO, payload: updatedTodo }))
    .catch((e) => console.error(e));
};

export const completedTodoAction = (id, updatedTodo) => async (dispatch) => {
  let data = {
    url: API_URLS(id).TODO.BY_ID,
    method: "PATCH",
    body: { completed: updatedTodo.completed },
  };
  await requestApi(data)
    .then(() => dispatch({ type: UPDATE_COMPLETED_TODO, payload: updatedTodo }))
    .catch((e) => console.error(e));
};

export const deleteTodoAction = (id) => async (dispatch) => {
  let data = {
    url: API_URLS(id).TODO.BY_ID,
    method: "DELETE",
  };
  await requestApi(data)
    .then(() => dispatch({ type: DELETE_TODO, payload: id }))
    .catch((e) => console.error(e));
};
