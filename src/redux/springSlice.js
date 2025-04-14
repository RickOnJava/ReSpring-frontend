import { server } from '@/config';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchSprings = createAsyncThunk(
  'springs/fetchSprings',
  async (_, thunkAPI) => {
    try {
      const res = await axios.get(`${server}/api/v1/springs`);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

const springSlice = createSlice({
  name: 'springs',
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSprings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSprings.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(fetchSprings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default springSlice.reducer;
