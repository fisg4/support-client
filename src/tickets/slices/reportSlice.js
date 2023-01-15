import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  reportList: [],
  reportStatus: "sent",
};

export const reportSlice = createSlice({
  name: "report",
  initialState,
  reducers: {
    setReportList: (state, action) => {
      state.reportList = action.payload;
    },
    setReportStatus: (state, action) => {
      state.reportStatus = action.payload;
    },
  },
});

export const { setReportList, setReportStatus } = reportSlice.actions;

export default reportSlice.reducer;
