import { afterEach, beforeEach, expect, test, vi } from "vitest";
import { ingredientDetailSlice } from "./slice";
import { selectIngredient } from "./actions";
import { Ingredient } from "../../../types/ingredient";

const { reducer, getInitialState } = ingredientDetailSlice;

const getTestIngredient = (): Ingredient => ({
  _id: "643d69a5c3f7b9001cfa093d",
  name: "Флюоресцентная булка R2-D3",
  type: "bun",
  proteins: 44,
  fat: 26,
  carbohydrates: 85,
  calories: 643,
  price: 988,
  image: "https://code.s3.yandex.net/react/code/bun-01.png",
  image_mobile: "https://code.s3.yandex.net/react/code/bun-01-mobile.png",
  image_large: "https://code.s3.yandex.net/react/code/bun-01-large.png",
  __v: 0,
});

test("select Ingredient", () => {
  expect(
    reducer(
      getInitialState(),
      selectIngredient({
        ingredient: getTestIngredient(),
      }),
    ),
  ).toMatchSnapshot();
});
