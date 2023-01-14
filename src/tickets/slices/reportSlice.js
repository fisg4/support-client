import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  reportList: [],
};

export const reportSlice = createSlice({
  name: "report",
  initialState,
  reducers: {
    setReportList: (state, action) => {
      state.reportList = action.payload;
    },
  },
});

export const { setReportList } = reportSlice.actions;

export default reportSlice.reducer;
