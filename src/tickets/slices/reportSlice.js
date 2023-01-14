import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  reportList: [],
  reportStatus: "sent",
  reportValidationErrors: false,
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
    setReportValidationErrors: (state, action) => {
      state.reportValidationErrors = action.payload;
    },
  },
});

export const { setReportList, setReportStatus, setReportValidationErrors } = reportSlice.actions;

export default reportSlice.reducer;
