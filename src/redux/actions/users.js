import {
  SIGNUP_NEW_USER,
  FETCH_TOKEN,
  FETCH_TOKEN_FAILED,
  TOKEN_REMOVE,
  FETCH_USER,
  UPLOAD_PHOTO,
} from "../constants";
import API_URLS from "../../api";
import { requestApi } from "../../helpers/index.js";

export const signupAction = (userData) => async (dispatch) => {
  let data = {
    url: API_URLS().AUTH.SIGNUP,
    method: "POST",
    body: {
      ...userData,
    },
  };
  await requestApi(data);
  dispatch({ type: SIGNUP_NEW_USER });
};

export const loginAction = (userData) => async (dispatch) => {
  let data = {
    url: API_URLS().AUTH.LOGIN,
    method: "POST",
    body: {
      ...userData,
    },
  };
  await requestApi(data)
    .then((res) => {
      dispatch({ type: FETCH_TOKEN, payload: res?.data?.result });
    })
    .catch((e) => {
      console.error(e);
      dispatch({ type: FETCH_TOKEN_FAILED });
    });
};

export const logoutAction = () => async (dispatch) => {
  let data = {
    url: API_URLS().AUTH.LOGOUT,
    method: "POST",
  };
  await requestApi(data);
  dispatch({ type: TOKEN_REMOVE });
};

export const fetchUserAction = () => async (dispatch) => {
  let data = {
    url: API_URLS().AUTH.PROFILE,
  };
  await requestApi(data)
    .then((res) => {
      dispatch({ type: FETCH_USER, payload: res?.data?.result });
    })
    .catch((e) => {
      console.error(e);
      dispatch({ type: FETCH_TOKEN_FAILED });
    });
};

export const updatePhotoAction = (formData) => async (dispatch) => {
  let data = {
    url: API_URLS().AUTH.UPLOAD_PHOTO,
    method: "POST",
    body: formData,
    contentType: "multipart/form-data",
  };
  await requestApi(data)
    .then((res) => {
      dispatch({ type: UPLOAD_PHOTO, payload: res?.data?.result });
    })
    .catch((e) => {
      console.error(e);
    });
};
