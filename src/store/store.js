// src/redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slice/authSlice";

const store = configureStore({
  reducer: {
    auth: authReducer, // Add the auth slice to the store
  },
});

export default store;
