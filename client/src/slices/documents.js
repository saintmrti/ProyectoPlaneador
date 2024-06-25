import { createSlice } from "@reduxjs/toolkit";

const Slice = createSlice({
  name: "documents",
  initialState: {
    data: {
      inv_nacional: false,
      req_celda: false,
      wip_jam: false,
      week: false,
    },
    isFetchingInv: false,
    didErrorInv: false,
    isFetchingReq: false,
    didErrorReq: false,
    isFetchingWip: false,
    didErrorWip: false,
    isFetchingWeek: false,
    didErrorWeek: false,
  },
  reducers: {
    invDocumentsRequest: (state) => {
      state.isFetchingInv = true;
      state.didErrorInv = false;
    },
    invDocumentsSuccess: (state, action) => {
      const {
        data: { uploadStatus },
      } = action.payload;
      state.data.inv_nacional = uploadStatus;
      state.isFetchingInv = false;
    },
    invDocumentsError: (state) => {
      state.isFetchingInv = false;
      state.didErrorInv = true;
    },
    reqDocumentsRequest: (state) => {
      state.isFetchingReq = true;
      state.didErrorReq = false;
    },
    reqDocumentsSuccess: (state, action) => {
      const {
        data: { uploadStatus },
      } = action.payload;
      state.data.req_celda = uploadStatus;
      state.isFetchingReq = false;
    },
    reqDocumentsError: (state) => {
      state.isFetchingReq = false;
      state.didErrorReq = true;
    },
    wipDocumentsRequest: (state) => {
      state.isFetchingWip = true;
      state.didErrorWip = false;
    },
    wipDocumentsSuccess: (state, action) => {
      const {
        data: { uploadStatus },
      } = action.payload;
      state.data.wip_jam = uploadStatus;
      state.isFetchingWip = false;
    },
    wipDocumentsError: (state) => {
      state.isFetchingWip = false;
      state.didErrorWip = true;
    },
    weekDocumentsRequest: (state) => {
      state.isFetchingWeek = true;
      state.didErrorWeek = false;
    },
    weekDocumentsSuccess: (state, action) => {
      const {
        data: { uploadStatus },
      } = action.payload;
      state.data.week = uploadStatus;
      state.isFetchingWeek = false;
    },
    weekDocumentsError: (state) => {
      state.isFetchingWeek = false;
      state.didErrorWeek = true;
    },
    changeDocuments: (state, action) => {
      state.data = {
        inv_nacional: action.payload,
        req_celda: action.payload,
        wip_jam: action.payload,
        week: action.payload,
      };
    },
  },
});

export const {
  invDocumentsRequest,
  invDocumentsSuccess,
  invDocumentsError,
  reqDocumentsRequest,
  reqDocumentsSuccess,
  reqDocumentsError,
  wipDocumentsRequest,
  wipDocumentsSuccess,
  wipDocumentsError,
  weekDocumentsRequest,
  weekDocumentsSuccess,
  weekDocumentsError,
  changeDocuments,
} = Slice.actions;
export default Slice.reducer;
