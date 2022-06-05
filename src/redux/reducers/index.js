import { combineReducers } from "redux";
import userReducer from "./users";
import todoReducer from "./todos";
import notificationReducer from "./notifications";

const reducers = combineReducers({
  auth: userReducer,
  todo: todoReducer,
  notification: notificationReducer,
});

export default reducers;
