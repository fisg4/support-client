import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  ticketList: [],
  ticketStatus: "sent",
  ticketPriority: "low",
  validationErrors: false
};

export const ticketSlice = createSlice({
  name: "ticket",
  initialState,
  reducers: {
    setTicketList: (state, action) => {
      state.ticketList = action.payload;
    },
    addTicket: (state, action) => {
      state.ticketList.unshift(action.payload);
    },
    setTicketStatus: (state, action) => {
      state.ticketStatus = action.payload;
    },
    setTicketPriority: (state, action) => {
      state.ticketPriority = action.payload;
    },
    setValidationErrors: (state, action) => {
      state.validationErrors = action.payload;
    }
  },
});

export const { setTicketList, addTicket, setTicketStatus, setTicketPriority, setValidationErrors } = ticketSlice.actions;

export default ticketSlice.reducer;
