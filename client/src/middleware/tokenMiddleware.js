import axios from "axios";

import { authSuccess, authSignOut } from "../slices/auth";

const tokenMiddleware =
  ({ getState, dispatch }) =>
  (next) => {
    axios.interceptors.response.use(
      (response) => response,
      ({ response: { status } }) => {
        const {
          auth: { didError },
        } = getState();
        if (status === 401 && !didError) {
          dispatch(authSignOut());
        }
      }
    );
    if (process.env.NODE_ENV !== "development") {
      axios.defaults.baseURL = `${window.location.origin}/`;
    }
    const {
      auth: { token },
    } = getState();
    if (token) {
      axios.defaults.headers.common["authorization"] = token;
    }
    return (action) => {
      switch (action.type) {
        case authSuccess.toString():
          const token = action.payload;
          localStorage.setItem("qlt40_token", token);
          axios.defaults.headers.common["authorization"] = token;
          break;
        case authSignOut.toString():
          localStorage.removeItem("qlt40_token");
          delete axios.defaults.headers.common["authorization"];
          break;
        default:
          break;
      }
      next(action);
    };
  };

export default tokenMiddleware;
