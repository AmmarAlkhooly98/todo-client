import { TOGGLE_NOTIFICATION, TOGGLE_NOTIFICATION_OFF } from "../constants";

const initialState = {
  message: "",
  open: false,
  variant: "info",
};

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_NOTIFICATION:
      return {
        ...state,
        message: action.payload?.message,
        variant: action.payload?.success ? "success" : "error",
        open: true,
      };
    case TOGGLE_NOTIFICATION_OFF:
      return {
        ...state,
        message: "",
        variant: "info",
        open: false,
      };
    default:
      return state;
  }
};

export default notificationReducer;
