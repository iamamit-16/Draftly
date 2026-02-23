import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import api from "../axios";
import { act } from "react";

export const register = createAsyncThunk("auth/register", async (userData, thunkAPI) => {
    try {
        const response = await api.post("auth/register", userData);
        localStorage.setItem("user", JSON.stringify(response.data));
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data?.message || "Registration failed");
    }
});

export const login = createAsyncThunk("auth/login",async(userData,thunkAPI)=>{
    try {
              console.log("Sending login request...");

        const response = await api.post("/auth/login",userData)
              console.log("Response:", response);

        localStorage.setItem("user",JSON.stringify(response.data));
        return response.data;

    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data?.message||"Login Faild")
    }
})

const authSlice = createSlice({
    name:"auth",
    initialState:{
        user:JSON.parse(localStorage.getItem("user"))||null,
        loading:false,
        error:null,
    },
    reducers:{
        logout:(state)=>{       
             localStorage.removeItem("user");
             state.user = null;
            }
    },
    extraReducers:(builder)=>{
        builder
            .addCase(login.pending,(state)=>{
                state.loading=true;
            })
            .addCase(login.fulfilled,(state,action)=>{
                state.loading=false;
                state.user = action.payload;
                state.error = null;
            })
            .addCase(login.rejected,(state,action)=>{
                state.loading=false;
                state.error = action.payload;
            })
            .addCase(register.pending, (state) => {
            state.loading = true;
            state.error = null;
            })
            .addCase(register.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload;
            state.error = null;
            })
            .addCase(register.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
            });
    }
})

export const  {logout} = authSlice.actions;
export default authSlice.reducer;