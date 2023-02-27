import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./slice/userSlice";

import logger from "redux-logger";

const initState = [];

export const store = configureStore({
  initState,
  reducer: {
    user: userReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
});
