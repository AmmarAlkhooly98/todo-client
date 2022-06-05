import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUserAction } from "../redux/actions/users";

const UserProfile = () => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.user);
  console.log(user);
  useEffect(() => {
    dispatch(fetchUserAction());
  }, []);
  return <div>UserProfile</div>;
};

export default UserProfile;
