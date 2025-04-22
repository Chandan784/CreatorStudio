import { createSlice } from "@reduxjs/toolkit";
import { getUserPlansById, createPlan } from "../api/plan";

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
        //User Plan by Id
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
        
        // Create and Save plans
        .addCase(createPlan.pending, (state) =>{
            state.loading = true;
            state.message = "New Plan saving" ;
        })
        .addCase(createPlan.fulfilled, (state, action) => {
            state.loading = false;
            state.plans = action.payload;
            state.message = "New Plan Saved";
        })
        .addCase(createPlan.rejected, (state, action) => {
            state.message = action.payload;
            state.error = action.payload.message;
        })

    }
})

export default planSlice.reducer ;