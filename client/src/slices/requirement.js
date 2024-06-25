import { createSlice } from "@reduxjs/toolkit";
import _ from "lodash";

const Slice = createSlice({
  name: "requirement",
  initialState: {
    data: {},
    isFetching: false,
    didError: false,
    isFetchingInsert: false,
    didErrorInsert: false,
    isFetchingDelete: false,
    didErrorDelete: false,
  },
  reducers: {
    fetchRequirementRequest: (state) => {
      state.isFetching = true;
      state.didError = false;
    },
    fetchRequirementSuccess: (state, action) => {
      const { data } = action.payload;
      state.data = _.keyBy(data, "id");
      state.isFetching = false;
    },
    fetchRequirementError: (state) => {
      state.isFetching = false;
      state.didError = true;
    },
    insertRequirementRequest: (state) => {
      state.isFetchingInsert = true;
      state.didErrorInsert = false;
    },
    insertRequirementSuccess: (state, action) => {
      const { data } = action.payload;
      state.data = data;
      state.isFetchingInsert = false;
    },
    insertRequirementError: (state) => {
      state.isFetchingInsert = false;
      state.didErrorInsert = true;
    },
    deleteRequirementRequest: (state) => {
      state.isFetchingDelete = true;
      state.didErrorDelete = false;
    },
    deleteRequirementSuccess: (state, action) => {
      const { data } = action.payload;
      state.data = data;
      state.isFetchingDelete = false;
    },
    deleteRequirementError: (state) => {
      state.isFetchingDelete = false;
      state.didErrorDelete = true;
    },
  },
});

export const {
  fetchRequirementRequest,
  fetchRequirementSuccess,
  fetchRequirementError,
  insertRequirementRequest,
  insertRequirementSuccess,
  insertRequirementError,
  deleteRequirementRequest,
  deleteRequirementSuccess,
  deleteRequirementError,
} = Slice.actions;
export default Slice.reducer;
