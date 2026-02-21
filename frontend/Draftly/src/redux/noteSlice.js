import { createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import api from "../axios";

export const fetchNotes = createAsyncThunk('notes/fetchNotes', async(_,thunkAPI)=>{
    try {
    const response = await api.get('/notes')
    return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data?.message|| "failed to fetch");

    }

})

export const createNote = createAsyncThunk('notes/addNote',async (noteData,thunkAPI)=>{
    try {
        const response =await api.post('/notes',noteData);
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data?.message|| "failed to post");
        
    }
})

export const updateNote = createAsyncThunk('notes/updateNote',async ({id,noteData},thunkAPI)=>{
    try {
        const response = await api.put(`/notes/${id}`, noteData);
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data?.message || "Failed to update");
        
    }
})

export const deleteNote = createAsyncThunk('notes/deleteNote',async(id,thunkAPI)=>{
    try {
        const response = await api.delete(`/notes/${id}`)
        return id;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data?.message || "Failed to delete");
    }
})

const noteSlice = createSlice({
    name:"notes",
    initialState:{
        items:[],
        status:'idle',
        error:null,
    },
    reducers: {},
    extraReducers:(builder)=>{
      builder
      .addCase(fetchNotes.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchNotes.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchNotes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload == 'string'
        ? action.payload
        :(action.payload?.message||"An unexpected error occurred");
      })

      .addCase(createNote.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(updateNote.fulfilled, (state, action) => {
        const index = state.items.findIndex((n) => n._id === action.payload._id);
        if (index !== -1) state.items[index] = action.payload;
      })
      .addCase(deleteNote.fulfilled, (state, action) => {
        state.items = state.items.filter((n) => n._id !== action.payload);
      });    
    }
})

export default noteSlice.reducer;