const API_ROOT = "http://localhost:8000/api/v1";

const API_URLS = (extraData) => ({
  // the extraData can be used to send url params and request query data if needed to api.
  ROOT: API_ROOT,
  AUTH: {
    LOGIN: API_ROOT + "/users/login/",
    SIGNUP: API_ROOT + "/users/signup/",
    LOGOUT: API_ROOT + "/users/logout/",
    PROFILE: API_ROOT + "/users/profile/",
  },
  TODO: {
    ROOT: API_ROOT + "/todos/", // can make GET & POST  todo with this endpoint, difference being the http verb
    BY_ID: API_ROOT + "/todos/" + extraData, // can make GET, POST, PATCH, PUT, and DELETE with this endpoint, difference being the http verb
  },
});

export default API_URLS;
