import { createSlice } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";

// Check if we are in a browser environment before accessing localStorage
const token =
  typeof window !== "undefined" ? localStorage.getItem("token") : null;

const initialState = {
  token: token || null,
  isLoggedIn: !!token,
  user: token ? jwtDecode(token) : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.token = action.payload;
      state.isLoggedIn = true;
      state.user = jwtDecode(action.payload);

      // Only set in localStorage if in the browser
      if (typeof window !== "undefined") {
        localStorage.setItem("token", action.payload);
      }
    },
    logout: (state) => {
      state.token = null;
      state.isLoggedIn = false;

      if (typeof window !== "undefined") {
        localStorage.removeItem("token");
      }
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
