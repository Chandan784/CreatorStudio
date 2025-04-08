import { createSlice } from "@reduxjs/toolkit";
import { loginUser, logoutUser, fetchUser, registerUser } from "../api/auth";


const initialState = {
  user: null,
  isLoggedIn: false,
  loading: false,
  error: null,
  message: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearAuthState: (state) => {
      state.error = null;
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // LOGIN
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.message = action.payload.message;
        console.log("message", state.message);
        state.isLoggedIn = action.payload.message === "Login successful";

      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // SIGNUP
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.message = action.payload.message;
        state.isLoggedIn = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // FETCH USER
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoggedIn = true;
        state.loading = false;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.user = null;
        state.isLoggedIn = false;
        state.loading = false;
        state.error = action.payload;
      })

      // LOGOUT
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.isLoggedIn = false;
        state.loading = false;
        state.error = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // FORGOT PASSWORD
      .addCase(forgotUserPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(forgotUserPassword.fulfilled, (state,action) => {
        state.loading = false;
        state.message = action.payload.message;
        state.isLoggedIn = false;
      })
      .addCase(forgotUserPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // RESET PASSWORD
      .addCase(resetUserPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(resetUserPassword.fulfilled, (state,action) => {
        state.loading = false;
        state.message = action.payload.message;
        state.isLoggedIn = true;
      })
      .addCase(resetUserPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
  },
});


export default authSlice.reducer;
