import { createSlice } from "@reduxjs/toolkit";
import { getAdminLeadsById, getAdminLeadsUpdatesById } from "../api/leads";

const initialState = {
    leads: null,
    loading : null,
    error : null,
    message:null,
}

const leadsSlice = createSlice({
    name: "leads",
    initialState,
    reducers : {},
    extraReducers :  (builder) => {
        builder
        .addCase( getAdminLeadsById.pending, (state) => {
            state.loading = true;
            state.message = "leads data is loading";
        })
        .addCase(getAdminLeadsById.fulfilled, (state, action) => {
            state.loading = false;
            state.plans = action.payload;
            state.message = "leads data fetched"

        })
        .addCase(getAdminLeadsById.rejected, (state, action) => {
            state.message = action.payload;
            state.error = action.payload;
        })
        
        // Create and Save plans
        .addCase(getAdminLeadsUpdatesById.pending, (state) =>{
            state.loading = true;
            state.message = "Leads Data Update" ;
        })
        .addCase(getAdminLeadsUpdatesById.fulfilled, (state, action) => {
            state.loading = false;
            state.plans = action.payload;
            state.message = "Leads Data Update done";
        })
        .addCase(getAdminLeadsUpdatesById.rejected, (state, action) => {
            state.message = action.payload;
            state.error = action.payload.message;
        })

    }
})

export default leadsSlice.reducer ;