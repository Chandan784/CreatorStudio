import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios";


export const getAdminLeadsById = createAsyncThunk(
    "admin/leads",
    async (_, thunkAPI) => {
        try {
            const res = await axios.get(
                `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/v1/leads`
            );
            console.log(`Result of leads data`, res);
            return res.data;
        }

        catch (err) {
            console.log(err, "Error msg");

            return thunkAPI.rejectWithValue(
                err.response?.data?.message || "Failed to fetch leads data"
            );
        }
    }
)

export const getAdminLeadsUpdatesById = createAsyncThunk(
    "admin/updateLead",
    async ({ id, editedLead }, thunkAPI) => {
        try {
            const res = await axios.put(
                `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/v1/leads/${id}`,
                editedLead
            );
            console.log("Result of leads update:", res);
            return res.data;
        } catch (err) {
            console.error("Error updating lead:", err);
            return thunkAPI.rejectWithValue(
                err.response?.data?.message || "Failed to update lead data"
            );
        }
    }
);
