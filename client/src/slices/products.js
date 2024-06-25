import { createSlice } from "@reduxjs/toolkit";
import _ from "lodash";

const Slice = createSlice({
  name: "products",
  initialState: {
    data: {},
    isFetching: false,
    didError: false,
    isFetchingUpdate: false,
    didErrorUpdate: false,
  },
  reducers: {
    fetchProductsRequest: (state) => {
      state.isFetching = true;
      state.didError = false;
    },
    fetchProductsSuccess: (state, action) => {
      const { data } = action.payload;
      state.data = _.keyBy(data, "id");
      state.isFetching = false;
    },
    fetchProductsError: (state) => {
      state.isFetching = false;
      state.didError = true;
    },
    //   insertProductsRequest: (state) => {
    //     state.isFetchingInsert = true;
    //     state.didErrorInsert = false;
    //   },
    //   insertProductsSuccess: (state, action) => {
    //     const { data } = action.payload;
    //     state.data[data.id] = data;
    //     state.isFetchingInsert = false;
    //   },
    //   insertProductsError: (state) => {
    //     state.isFetchingInsert = false;
    //     state.didErrorInsert = true;
    //   },
    updateProductsRequest: (state) => {
      state.isFetchingUpdate = true;
      state.didErrorUpdate = false;
    },
    updateProductsSuccess: (state, action) => {
      const { data } = action.payload;
      state.data[data.id] = data;
      state.isFetchingUpdate = false;
    },
    updateProductsError: (state) => {
      state.isFetchingUpdate = false;
      state.didErrorUpdate = true;
    },
    //   deleteProductsRequest: (state) => {
    //     state.isFetchingDelete = true;
    //     state.didErrorDelete = false;
    //   },
    //   deleteProductsSuccess: (state, action) => {
    //     const { idSku } = action.payload;
    //     delete state.data[idSku];
    //     state.isFetchingDelete = false;
    //   },
    //   deleteProductsError: (state) => {
    //     state.isFetchingDelete = false;
    //     state.didErrorDelete = true;
    //   },
  },
});

export const {
  fetchProductsRequest,
  fetchProductsSuccess,
  fetchProductsError,
  updateProductsRequest,
  updateProductsSuccess,
  updateProductsError,
} = Slice.actions;
export default Slice.reducer;
