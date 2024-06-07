import { configureStore } from "@reduxjs/toolkit";
import { recipesReducer } from "./recipesSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { recipeReducer } from "./recipeDetailsSlice";

export const store = configureStore({
  reducer: {
    recipes: recipesReducer,
    recipe: recipeReducer,
  },
});

export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<
  ReturnType<typeof store.getState>
> = useSelector;
