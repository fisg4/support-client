import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  ticketList: [],
  ticketStatus: "sent",
  ticketPriority: "low",
};

export const ticketSlice = createSlice({
  name: "ticket",
  initialState,
  reducers: {
    setTicketList: (state, action) => {
      state.ticketList = action.payload;
    },
    addTicket: (state, action) => {
      state.ticketList.push(action.payload);
    },
    setTicketStatus: (state, action) => {
      state.ticketStatus = action.payload;
    },
    setTicketPriority: (state, action) => {
      state.ticketPriority = action.payload;
    },
  },
});

export const { setTicketList, addTicket, setTicketStatus, setTicketPriority } = ticketSlice.actions;

export default ticketSlice.reducer;
