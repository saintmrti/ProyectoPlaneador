import { createSlice } from "@reduxjs/toolkit";
import _ from "lodash";

const Slice = createSlice({
  name: "production",
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
    isFetchingHide: false,
    didErrorHide: false,
    isFetchingSequence: false,
    didErrorSequence: false,
  },
  reducers: {
    fetchProductionRequest: (state) => {
      state.isFetching = true;
      state.didError = false;
    },
    fetchProductionSuccess: (state, action) => {
      const { data } = action.payload;
      state.data = _.keyBy(data, "idOrdenProduccion");
      state.isFetching = false;
    },
    fetchProductionError: (state) => {
      state.isFetching = false;
      state.didError = true;
    },
    insertProductionRequest: (state) => {
      state.isFetchingInsert = true;
      state.didErrorInsert = false;
    },
    insertProductionSuccess: (state, action) => {
      const { data } = action.payload;
      state.data[data.idOrdenProduccion] = data;
      state.isFetchingInsert = false;
    },
    insertProductionError: (state) => {
      state.isFetchingInsert = false;
      state.didErrorInsert = true;
    },
    updateProductionRequest: (state) => {
      state.isFetchingUpdate = true;
      state.didErrorUpdate = false;
    },
    updateProductionSuccess: (state, action) => {
      const { data } = action.payload;
      state.data = _.keyBy(data, "idOrdenProduccion");
      state.isFetchingUpdate = false;
    },
    updateProductionError: (state) => {
      state.isFetchingUpdate = false;
      state.didErrorUpdate = true;
    },
    deleteProductionRequest: (state) => {
      state.isFetchingDelete = true;
      state.didErrorDelete = false;
    },
    deleteProductionSuccess: (state, action) => {
      const { data } = action.payload;
      delete state.data[parseInt(data)];
      state.isFetchingDelete = false;
    },
    deleteProductionError: (state) => {
      state.isFetchingDelete = false;
      state.didErrorDelete = true;
    },
    hideProductionRequest: (state) => {
      state.isFetchingHide = true;
      state.didErrorHide = false;
    },
    hideProductionSuccess: (state, action) => {
      const { data } = action.payload;
      delete state.data[parseInt(data)];
      state.isFetchingHide = false;
    },
    hideProductionError: (state) => {
      state.isFetchingHide = false;
      state.didErrorHide = true;
    },
    sequenceProductionRequest: (state) => {
      state.isFetchingSequence = true;
      state.didErrorSequence = false;
    },
    sequenceProductionSuccess: (state) => {
      state.isFetchingSequence = false;
    },
    sequenceProductionError: (state) => {
      state.isFetchingSequence = false;
      state.didErrorSequence = true;
    },
  },
});

export const {
  fetchProductionRequest,
  fetchProductionSuccess,
  fetchProductionError,
  insertProductionRequest,
  insertProductionSuccess,
  insertProductionError,
  updateProductionRequest,
  updateProductionSuccess,
  updateProductionError,
  deleteProductionRequest,
  deleteProductionSuccess,
  deleteProductionError,
  hideProductionRequest,
  hideProductionSuccess,
  hideProductionError,
  sequenceProductionRequest,
  sequenceProductionSuccess,
  sequenceProductionError,
} = Slice.actions;
export default Slice.reducer;
