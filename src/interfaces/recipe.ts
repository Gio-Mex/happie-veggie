import { AnalyzedInstruction } from "./analyzedInstructions";
import { ExtendedIngredient } from "./ingredient";

export interface Recipe {
  id: string;
  image: string;
  title: string;
}

export interface RecipeDetailsInterface extends Recipe {
  servings: number;
  extendedIngredients: ExtendedIngredient[];
  analyzedInstructions: AnalyzedInstruction[];
  readyInMinutes: number;
}
