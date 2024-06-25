import { createSlice } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";
import moment from "moment-timezone";

const getInitialState = () => {
  const token = localStorage.getItem("qlt40_token");
  const state = {
    isAuth: false,
    token: null,
    tokenData: {},
    isFetching: false,
    didError: false,
    status: null,
  };
  if (token && moment().isBefore(moment(jwtDecode(token).exp * 1000))) {
    state.isAuth = true;
    state.token = token;
    state.tokenData = jwtDecode(token);
  } else {
    localStorage.removeItem("qlt40_token");
  }
  return state;
};

const Slice = createSlice({
  name: "auth",
  initialState: getInitialState(),
  reducers: {
    authRequest: (state) => {
      state.isFetching = true;
      state.didError = false;
    },
    authSuccess: (state, action) => {
      const token = action.payload;
      state.isAuth = true;
      state.token = token;
      state.tokenData = jwtDecode(token);
      state.isFetching = false;
    },
    authError: (state, action) => {
      state.isFetching = false;
      state.didError = true;
      state.status = action.payload;
    },
    authSignOut: (state) => {
      state.isAuth = false;
      state.token = null;
      state.tokenData = {};
    },
  },
});

export const { authRequest, authSuccess, authError, authSignOut } =
  Slice.actions;
export default Slice.reducer;
