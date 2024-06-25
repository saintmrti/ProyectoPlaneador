import { createSlice } from "@reduxjs/toolkit";
import _ from "lodash";

const Slice = createSlice({
  name: "projects",
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
    fetchProjectsRequest: (state) => {
      state.isFetching = true;
      state.didError = false;
    },
    fetchProjectsSuccess: (state, action) => {
      const { data } = action.payload;
      state.data = _.keyBy(data, "id");
      state.isFetching = false;
    },
    fetchProjectsError: (state) => {
      state.isFetching = false;
      state.didError = true;
    },
    insertProjectRequest: (state) => {
      state.isFetchingInsert = true;
      state.didErrorInsert = false;
    },
    insertProjectSuccess: (state, action) => {
      const { data } = action.payload;
      state.data[data.id] = data;
      state.isFetchingInsert = false;
    },
    insertProjectError: (state) => {
      state.isFetchingInsert = false;
      state.didErrorInsert = true;
    },
    updateProjectRequest: (state) => {
      state.isFetchingUpdate = true;
      state.didErrorUpdate = false;
    },
    updateProjectSuccess: (state, action) => {
      const { data } = action.payload;
      state.data[data.id] = data;
      state.isFetchingUpdate = false;
    },
    updateProjectError: (state) => {
      state.isFetchingUpdate = false;
      state.didErrorUpdate = true;
    },
    deleteProjectRequest: (state) => {
      state.isFetchingDelete = true;
      state.didErrorDelete = false;
    },
    deleteProjectSuccess: (state, action) => {
      const { idProyecto } = action.payload;
      delete state.data[idProyecto];
      state.isFetchingDelete = false;
    },
    deleteProjectError: (state) => {
      state.isFetchingDelete = false;
      state.didErrorDelete = true;
    },
  },
});

export const {
  fetchProjectsRequest,
  fetchProjectsSuccess,
  fetchProjectsError,
  insertProjectRequest,
  insertProjectSuccess,
  insertProjectError,
  updateProjectRequest,
  updateProjectSuccess,
  updateProjectError,
  deleteProjectRequest,
  deleteProjectSuccess,
  deleteProjectError,
} = Slice.actions;
export default Slice.reducer;
