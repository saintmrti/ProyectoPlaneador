import { createSlice } from "@reduxjs/toolkit";

const Slice = createSlice({
  name: "slicedOrders",
  initialState: {
    data: [],
    isFetching: false,
    didError: false,
    isFetchingInsert: false,
    didErrorInsert: false,
    isFetchingUpdate: false,
    didErrorUpdate: false,
  },
  reducers: {
    fetchSlicedOrdersRequest: (state) => {
      state.isFetching = true;
      state.didError = false;
    },
    fetchSlicedOrdersSuccess: (state, action) => {
      const { data } = action.payload;
      state.data = data;
      state.isFetching = false;
    },
    fetchSlicedOrdersError: (state) => {
      state.isFetching = false;
      state.didError = true;
    },
    insertSlicedOrdersRequest: (state) => {
      state.isFetchingInsert = true;
      state.didErrorInsert = false;
    },
    insertSlicedOrdersSuccess: (state) => {
      // const { data } = action.payload;
      // state.data = data;
      state.isFetchingInsert = false;
    },
    insertSlicedOrdersError: (state) => {
      state.isFetchingInsert = false;
      state.didErrorInsert = true;
    },
    updateSlicedOrdersRequest: (state) => {
      state.isFetchingUpdate = true;
      state.didErrorUpdate = false;
    },
    updateSlicedOrdersSuccess: (state, action) => {
      const { data } = action.payload;
      state.data = data;
      state.isFetchingUpdate = false;
    },
    updateSlicedOrdersError: (state) => {
      state.isFetchingUpdate = false;
      state.didErrorUpdate = true;
    },
  },
});

export const {
  insertSlicedOrdersRequest,
  insertSlicedOrdersSuccess,
  insertSlicedOrdersError,
  fetchSlicedOrdersRequest,
  fetchSlicedOrdersSuccess,
  fetchSlicedOrdersError,
  updateSlicedOrdersRequest,
  updateSlicedOrdersSuccess,
  updateSlicedOrdersError,
} = Slice.actions;
export default Slice.reducer;
