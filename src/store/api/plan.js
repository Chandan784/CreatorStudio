import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios";



// Users Plans

export const getUserPlansById = createAsyncThunk(
    "creator/plan",
    async (_, thunkAPI) => {
        try {
            const res = await axios.get(
                `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/v1/plans/user/67d173ffd0f78d32ad046925`
            );
            console.log(`Result of Plan`,res );    
            return res.data;
        } 
        
        catch (err) {
            console.log(err, "Error msg");
            
            return thunkAPI.rejectWithValue(
                err.response?.data?.message || "Failed to fetch user plans"
            );
        }
    }
)


export const createPlan = createAsyncThunk(
    "creator/newPlan",
    async (_, thunkAPI) => {
        try {
            const res = await axios.post(
                `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/v1/plans`,  {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(newPlan),
                }
            );
            console.log(`Result of New Plan`,res );
            return res.data;
        } catch (err) {
            console.error(err, "Error Saving Plan");
            return thunkAPI.rejectWithValue(
               err.response?.data?.message || "Failed to save plan, Please try again.")
            
        }
    }
)
