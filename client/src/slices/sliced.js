import { createSlice } from "@reduxjs/toolkit";
// import _ from "lodash";

const Slice = createSlice({
  name: "sliced",
  initialState: {
    data: {},
    isFetching: false,
    didError: false,
    isFetchingInsert: false,
    didErrorInsert: false,
  },
  reducers: {
    fetchSlicedRequest: (state) => {
      state.isFetching = true;
      state.didError = false;
    },
    fetchSlicedSuccess: (state, { payload: { data } }) => {
      state.data = data;
      state.isFetching = false;
    },
    fetchSlicedError: (state) => {
      state.isFetching = false;
      state.didError = true;
    },
    insertSlicedRequest: (state) => {
      state.isFetchingInsert = true;
      state.didErrorInsert = false;
    },
    insertSlicedSuccess: (state, { payload: { data } }) => {
      state.data = data;
      state.isFetchingInsert = false;
    },
    insertSlicedError: (state) => {
      state.isFetchingInsert = false;
      state.didErrorInsert = true;
    },
  },
});

export const {
  insertSlicedRequest,
  insertSlicedSuccess,
  insertSlicedError,
  fetchSlicedRequest,
  fetchSlicedSuccess,
  fetchSlicedError,
} = Slice.actions;
export default Slice.reducer;
