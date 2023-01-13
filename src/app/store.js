import { combineReducers, configureStore } from "@reduxjs/toolkit";
import ticketReducer from "../tickets/slices/ticketSlice";

const rootReducer = combineReducers({
  ticket: ticketReducer,
});

export const setupStore = (preloadedState) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
};