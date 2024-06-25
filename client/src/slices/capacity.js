import { createSlice } from "@reduxjs/toolkit";
import _ from "lodash";

const Slice = createSlice({
  name: "capacity",
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
    fetchCapacityRequest: (state) => {
      state.isFetching = true;
      state.didError = false;
    },
    fetchCapacitySuccess: (state, action) => {
      const { data } = action.payload;
      state.data = _.keyBy(data, "id");
      state.isFetching = false;
    },
    fetchCapacityError: (state) => {
      state.isFetching = false;
      state.didError = true;
    },
    insertCapacityRequest: (state) => {
      state.isFetchingInsert = true;
      state.didErrorInsert = false;
    },
    insertCapacitySuccess: (state, action) => {
      const { data } = action.payload;
      state.data[data.id] = data;
      state.isFetchingInsert = false;
    },
    insertCapacityError: (state) => {
      state.isFetchingInsert = false;
      state.didErrorInsert = true;
    },
    updateCapacityRequest: (state) => {
      state.isFetchingUpdate = true;
      state.didErrorUpdate = false;
    },
    updateCapacitySuccess: (state, action) => {
      const { data } = action.payload;
      state.data[data.id] = data;
      state.isFetchingUpdate = false;
    },
    updateCapacityError: (state) => {
      state.isFetchingUpdate = false;
      state.didErrorUpdate = true;
    },
    deleteCapacityRequest: (state) => {
      state.isFetchingDelete = true;
      state.didErrorDelete = false;
    },
    deleteCapacitySuccess: (state, action) => {
      const { idSku } = action.payload;
      delete state.data[idSku];
      state.isFetchingDelete = false;
    },
    deleteCapacityError: (state) => {
      state.isFetchingDelete = false;
      state.didErrorDelete = true;
    },
  },
});

export const {
  fetchCapacityRequest,
  fetchCapacitySuccess,
  fetchCapacityError,
  insertCapacityRequest,
  insertCapacitySuccess,
  insertCapacityError,
  updateCapacityRequest,
  updateCapacitySuccess,
  updateCapacityError,
  deleteCapacityRequest,
  deleteCapacitySuccess,
  deleteCapacityError,
} = Slice.actions;
export default Slice.reducer;
