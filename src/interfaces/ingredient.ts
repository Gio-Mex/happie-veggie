export interface Ingredient {
  id: number;
  name: string;
  image: string;
}

export interface ExtendedIngredient extends Ingredient {
  measures: {
    us: {
      amount: number;
      unitShort: string;
    };
    metric: {
      amount: number;
      unitShort: string;
    };
  }
  original: string;
}