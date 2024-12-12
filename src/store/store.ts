import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "../features/usersSlice";
import analyticsReducer from "../features/analyticsSlice";

export const store = configureStore({
  reducer: {
    users: usersReducer,
    analytics: analyticsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
