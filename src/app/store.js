import { combineReducers, configureStore } from "@reduxjs/toolkit";
import ticketReducer from "../tickets/slices/ticketSlice";
import reportReducer from "../tickets/slices/reportSlice";

const rootReducer = combineReducers({
  ticket: ticketReducer,
  report: reportReducer,
});

export const setupStore = (preloadedState) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
};