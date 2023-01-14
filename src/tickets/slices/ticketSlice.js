import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  ticketList: new Array(),
  ticketStatus: "sent",
  radio: "rejected",
  ticketPriority: "low",
  select: "low",
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
    setRadio: (state, action) => {
      state.radio = action.payload;
    },
    setTicketPriority: (state, action) => {
      state.ticketPriority = action.payload;
    },
    setSelect: (state, action) => {
      state.select = action.payload;
    },
  },
});

export const { setTicketList, addTicket, setTicketStatus, setRadio, setTicketPriority, setSelect } = ticketSlice.actions;

export default ticketSlice.reducer;
