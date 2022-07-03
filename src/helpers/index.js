import axios from "axios";
import store from "../redux/store";
import { logoutAction } from "../redux/actions/users";
import { toggleNotf } from "../redux/actions/notifications";

export const checkHttpStatus = async (response, showNotf) => {
  if (response.status >= 200 && response.status < 300) {
    showNotf && store.dispatch(toggleNotf(response.data));
    return response;
  }

  if (!response.data.success) {
    showNotf && store.dispatch(toggleNotf(response.data));
    throw new Error(response.statText);
  }
  return response;
};

export const requestApi = async (data, showNotf = true) => {
  const token = window.localStorage.getItem("token") || null;
  return await axios({
    url: data?.url,
    method: data?.method || "GET",
    data: data?.body || {},
    headers: {
      Accept: data?.accept || "application/json",
      "Content-Type": data?.contentType || "application/json",
      Authorization: token ? `Bearer ${token}` : undefined,
    },
  })
    .then((res) => checkHttpStatus(res, showNotf))
    .catch((e) => {
      let { data, status } = e.response;
      if (status === 401) {
        store.dispatch(logoutAction(false));
      }
      showNotf && store.dispatch(toggleNotf(data || { message: e.message }));
      throw new Error(e);
    });
};
