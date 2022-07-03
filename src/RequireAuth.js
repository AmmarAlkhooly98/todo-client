import { useEffect } from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toggleNotf } from "./redux/actions/notifications";
import store from "./redux/store";
import { logoutAction } from "./redux/actions/users";

const RequireAuth = () => {
  const token = window.localStorage.getItem("token") || null;
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!token) {
      dispatch(
        toggleNotf({
          success: false,
          message: "unauthorized access, please login first",
        })
      );
      store.dispatch(logoutAction(false));
    }
  }, [location.pathname]);

  return token ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};
export default RequireAuth;
