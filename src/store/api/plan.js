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

// axios
//       .get(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/v1/plans/user/67d173ffd0f78d32ad046925`)
//       .then((response) => {
//         setPlans(response.data);
//         setLoading(false);
//       })
//       .catch((error) => {
//         console.error("Error fetching plans:", error);
//         setLoading(false);
//       });