import {
  SIGNUP_NEW_USER,
  FETCH_TOKEN,
  FETCH_TOKEN_FAILED,
  TOKEN_REMOVE,
  FETCH_USER,
  UPLOAD_PHOTO,
} from "../constants";

let initialState = {
  user: null,
  token: window.localStorage.getItem("token") || null,
  isAuthenticated: false,
};

const userReducer = (state = initialState, action) => {
  const { token, ...rest } = action?.payload || {};
  switch (action.type) {
    case FETCH_TOKEN:
      window.localStorage.setItem("token", action?.payload?.token);
      return {
        ...state,
        token,
        user: rest,
        isAuthenticated: true,
      };
    case SIGNUP_NEW_USER:
      return {
        ...state,
        signupSuccess: true,
      };
    case FETCH_TOKEN_FAILED:
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
      };
    case FETCH_USER:
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
      };
    case UPLOAD_PHOTO:
      return {
        ...state,
        user: { ...state.user, image: action.payload },
      };
    case TOKEN_REMOVE:
      window.localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        user: null,
        isAuthenticated: false,
      };
    default:
      return state;
  }
};

export default userReducer;
