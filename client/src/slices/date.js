import { createSlice } from "@reduxjs/toolkit";
import moment from "moment-timezone";

const Slice = createSlice({
  name: "date",
  initialState: () => {
    const date = moment().format("YYYY-MM-DD");
    return {
      date: date,
    };
  },
  reducers: {
    changeDate: (state, action) => {
      state.date = action.payload;
    },
  },
});

export const { changeDate } = Slice.actions;
export default Slice.reducer;
