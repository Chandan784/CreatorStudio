import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// LOGIN
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }, thunkAPI) => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/v1/auth/login`,
        { email, password },
        { withCredentials: true }
      );
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Login failed"
      );
    }
  }
);



// SIGNUP
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async ({ name, email, password, role, phoneNumber }, thunkAPI) => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/v1/auth/register`,
        { name, email, password, role, phoneNumber }
      );
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Registration failed"
      );
    }
  }
);

// FETCH USER
export const fetchUser = createAsyncThunk(
  "auth/fetchUser",
  async (_, thunkAPI) => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/v1/auth/me`,
        {
          withCredentials: true,
        }
      );
      return res.data.user;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to fetch user"
      );
    }
  }
);

// LOGOUT
export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, thunkAPI) => {
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/v1/auth/logout`,
        {},
        {
          withCredentials: true,
        }
      );
      return true;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Logout failed"
      );
    }
  }
);

// FORGOT PASSWORD
export const forgotUserPassword = createAsyncThunk(
  "auth/forgotPassword",
  async ({email}, thunkAPI) => {
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/v1/auth/forgot-password`,
        { email }
      );
      console.log("Forgot pass response" , res);
      
      return res.data;
      
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Something went wrong."
      );
    } 
    
  }
)

// RESET USER PASSWORD
export const resetUserPassword = createAsyncThunk(
  "auth/resetPassword",
  async ({resetToken, newPassword}, thunkAPI) => {
    try {
      const res = await axios.post(
              `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/v1/auth/reset-password`,
              {  resetToken, newPassword }
            );
      console.log("Reset pass response" , res);
      
      return res.data;
      
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Something went wrong."
      );
    } 
    
  }
)


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

export const { clearAuthState } = authSlice.actions;
export default authSlice.reducer;
