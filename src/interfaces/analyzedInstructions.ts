import { EquipmentItem } from "./equipment";
import { ExtendedIngredient } from "./ingredient";

export interface AnalyzedInstruction {
  steps: Step[]
}

export interface Step {
  number: number;
  equipment: EquipmentItem[]
  ingredients: ExtendedIngredient[]
  step: string;
}