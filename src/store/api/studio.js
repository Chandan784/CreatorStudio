import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios";


export const getStudioBookingById = createAsyncThunk(
    "studio/[id]",
    async (_, thunkAPI) => {
        try {
            const res = await axios.post(
                `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/v1/bookings`
            );
            console.log(`Booking data add`, res);
            return res.data;
        }

        catch (err) {
            console.log(err, "Error msg");

            return thunkAPI.rejectWithValue(
                err.response?.data?.message || "Failed to fetch Booking data"
            );
        }
    }
)

export const getStudioAvailabilityByDate = createAsyncThunk(
    "studio/getAvailabilityByDate",
    async ({ studioId, date }, thunkAPI) => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/v1/availability/${studioId}/${date}`
        );
        console.log("Studio availability fetched:", res.data);
        return res.data;
      } catch (err) {
        console.error("Error fetching availability:", err);
        return thunkAPI.rejectWithValue(
          err.response?.data?.message || "Failed to fetch availability"
        );
      }
    }
  );