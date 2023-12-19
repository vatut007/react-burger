export type IngredientType = "main" | "sauce" | "bun";

export type Ingredient = {
  _id: string;
  name: string;
  type: IngredientType;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v: number;
};

export type IngredientConstructor = {
  cart_item_id: string;
  _id: string;
  name: string;
  type: IngredientType;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v: number;
};

export type IngredientList = Ingredient[];

export type IngredientConstructorList = IngredientConstructor[];

export type IngredientListResponse = { success: boolean; data: IngredientList };

export const types: IngredientType[] = ["bun", "sauce", "main"];
