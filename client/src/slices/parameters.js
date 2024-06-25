import { createSlice } from "@reduxjs/toolkit";
import _ from "lodash";

const Slice = createSlice({
  name: "parameters",
  initialState: {
    data: {},
    isFetching: false,
    didError: false,
    isFetchingInsert: false,
    didErrorInsert: false,
    isFetchingUpdate: false,
    didErrorUpdate: false,
    isFetchingDelete: false,
    didErrorDelete: false,
  },
  reducers: {
    fetchParametersRequest: (state) => {
      state.isFetching = true;
      state.didError = false;
    },
    fetchParametersSuccess: (state, action) => {
      const { data } = action.payload;
      state.data = _.keyBy(data, "id");
      state.isFetching = false;
    },
    fetchParametersError: (state) => {
      state.isFetching = false;
      state.didError = true;
    },
    insertParametersRequest: (state) => {
      state.isFetchingInsert = true;
      state.didErrorInsert = false;
    },
    insertParametersSuccess: (state, action) => {
      const { data } = action.payload;
      state.data[data.id] = data;
      state.isFetchingInsert = false;
    },
    insertParametersError: (state) => {
      state.isFetchingInsert = false;
      state.didErrorInsert = true;
    },
    updateParametersRequest: (state) => {
      state.isFetchingUpdate = true;
      state.didErrorUpdate = false;
    },
    updateParametersSuccess: (state, action) => {
      const { data } = action.payload;
      state.data[data.id] = data;
      state.isFetchingUpdate = false;
    },
    updateParametersError: (state) => {
      state.isFetchingUpdate = false;
      state.didErrorUpdate = true;
    },
    deleteParametersRequest: (state) => {
      state.isFetchingDelete = true;
      state.didErrorDelete = false;
    },
    deleteParametersSuccess: (state, action) => {
      const { id } = action.payload;
      delete state.data[id];
      state.isFetchingDelete = false;
    },
    deleteParametersError: (state) => {
      state.isFetchingDelete = false;
      state.didErrorDelete = true;
    },
  },
});

export const {
  fetchParametersRequest,
  fetchParametersSuccess,
  fetchParametersError,
  insertParametersRequest,
  insertParametersSuccess,
  insertParametersError,
  updateParametersRequest,
  updateParametersSuccess,
  updateParametersError,
  deleteParametersRequest,
  deleteParametersSuccess,
  deleteParametersError,
} = Slice.actions;
export default Slice.reducer;
