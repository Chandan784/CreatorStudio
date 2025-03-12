import { createSlice } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";

// Check if we are in a browser environment before accessing localStorage
const token =
  typeof window !== "undefined" ? localStorage.getItem("token") : null;

const initialState = {
  token: token || null,
  isLoggedIn: !!token,
  user: token ? jwtDecode(token) : null,
  loading: false, // Add loading state
  error: null, // Add error state
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Login reducer
    login: (state, action) => {
      state.token = action.payload;
      state.isLoggedIn = true;
      state.user = jwtDecode(action.payload);
      state.loading = false;
      state.error = null;

      // Only set in localStorage if in the browser
      if (typeof window !== "undefined") {
        localStorage.setItem("token", action.payload);
      }
    },

    // Logout reducer
    logout: (state) => {
      state.token = null;
      state.isLoggedIn = false;
      state.user = null;
      state.loading = false;
      state.error = null;

      if (typeof window !== "undefined") {
        localStorage.removeItem("token");
      }
    },

    // Signup reducer
    signup: (state, action) => {
      state.token = action.payload;
      state.isLoggedIn = true;
      state.user = jwtDecode(action.payload);
      state.loading = false;
      state.error = null;

      // Only set in localStorage if in the browser
      if (typeof window !== "undefined") {
        localStorage.setItem("token", action.payload);
      }
    },

    // Set loading state
    setLoading: (state, action) => {
      state.loading = action.payload;
    },

    // Set error state
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { login, logout, signup, setLoading, setError } =
  authSlice.actions;
export default authSlice.reducer;
