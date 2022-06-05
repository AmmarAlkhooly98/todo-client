import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toggleNotf } from "./redux/actions/notifications";

const RequireAuth = () => {
  const token = window.localStorage.getItem("token") || null;
  const location = useLocation();
  const dispatch = useDispatch();
  !token &&
    dispatch(
      toggleNotf({
        success: false,
        message: "unauthorized access, please login first",
      })
    );

  return token ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};
export default RequireAuth;
