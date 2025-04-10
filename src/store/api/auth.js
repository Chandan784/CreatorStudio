import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

//LOGIN
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

 // LOGOUT USER
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
  