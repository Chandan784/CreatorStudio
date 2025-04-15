// src/redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slice/authSlice";
import planReducer from "./slice/planSlice"

const store = configureStore({
  reducer: {
    auth: authReducer, // Add the auth slice to the store
    plan: planReducer, // Add the plan slice to the store
  },
});

export default store;
