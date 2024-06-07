import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  error: "",
  data: [],
};

export const getData = createAsyncThunk(
  "recipes/getData",
  async (endpoint: string) => {
    try {
      const response = await axios.get(
        `https://api.spoonacular.com/recipes${endpoint}`
      );
      return response.data.recipes
        ? response.data.recipes
        : response.data.results;
    } catch (error) {
      console.log(error);
    }
  }
);

const recipesSlice = createSlice({
  name: "recipes",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getData.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(getData.rejected, (state, action) => {
      state.loading = false;
      state.error = (action.error as Error).message;
      state.data = [];
    });
  },
});

export const recipesReducer = recipesSlice.reducer;
