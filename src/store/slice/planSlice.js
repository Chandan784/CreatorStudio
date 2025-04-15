import { createSlice } from "@reduxjs/toolkit";
import { getUserPlansById } from "../api/plan";

const initialState = {
    plans: [],
    loading : null,
    error : null,
    message:null,
}

const planSlice = createSlice({
    name: "plan",
    initialState,
    reducers : {},
    extraReducers :  (builder) => {
        builder
        .addCase( getUserPlansById.pending, (state) => {
            state.loading = true;
            state.message = "Plan is loading";
        })
        .addCase(getUserPlansById.fulfilled, (state, action) => {
            state.loading = false;
            state.plans = action.payload;
            state.message = "User plan fetched"

        })
        .addCase(getUserPlansById.rejected, (state, action) => {
            state.message = action.payload;
            state.error = action.payload;
        })
        
    }
})

export default planSlice.reducer ;