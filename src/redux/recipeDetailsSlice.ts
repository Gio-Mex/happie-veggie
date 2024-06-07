import { RecipeDetailsInterface } from "@/interfaces/recipe";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  error: "",
  data: {} as RecipeDetailsInterface,
};

export const getData = createAsyncThunk(
  "recipe/getData",
  async (endpoint: string) => {
    try {
      const response = await axios.get(
        `https://api.spoonacular.com/recipes${endpoint}`
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

const recipeSlice = createSlice({
  name: "recipe",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getData.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      console.log("payload", action.payload);
    });
    builder.addCase(getData.rejected, (state, action) => {
      state.loading = false;
      state.error = (action.error as Error).message;
    });
  },
});

export const recipeReducer = recipeSlice.reducer;
