import { createSlice } from "@reduxjs/toolkit";
import { getStudioAvailabilityByDate, getStudioBookingById } from "../api/studio";

const initialState = {
    studioId: null,
    loading: null,
    error: null,
    message: null,
}

const studioBookingSlice = createSlice({
    name: "studioId",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getStudioBookingById.pending, (state) => {
                state.loading = true;
                state.message = "Studio Booking data is loading";
            })
            .addCase(getStudioBookingById.fulfilled, (state, action) => {
                state.loading = false;
                state.plans = action.payload;
                state.message = "Studio Booking data fetched"

            })
            .addCase(getStudioBookingById.rejected, (state, action) => {
                state.message = action.payload;
                state.error = action.payload;
            })

        // Create and Save plans
        .addCase(getStudioAvailabilityByDate.pending, (state) =>{
            state.loading = true;
            state.message = "Studio availability Data Update" ;
        })
        .addCase(getStudioAvailabilityByDate.fulfilled, (state, action) => {
            state.loading = false;
            state.plans = action.payload;
            state.message = "Studio availability Data Update done";
        })
        .addCase(getStudioAvailabilityByDate.rejected, (state, action) => {
            state.message = action.payload;
            state.error = action.payload.message;
        })

    }
})

export default studioBookingSlice.reducer;