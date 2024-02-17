import { afterEach, beforeEach, expect, test, vi } from "vitest";
import type { Ingredient } from "../../../types/ingredient";
import { addIngredient, moveIngredient, removeIngredient } from "./actions";
import { burgerConstructorSlice } from "./slice";

const { nanoid } = vi.hoisted(() => ({ nanoid: vi.fn() }));

vi.mock("@reduxjs/toolkit", async (importOriginal) => {
  return {
    ...(await importOriginal<typeof import("@reduxjs/toolkit")>()),
    nanoid,
  };
});

const { reducer, getInitialState } = burgerConstructorSlice;

beforeEach(() => {
  nanoid
    .mockReturnValueOnce("random-string-first")
    .mockReturnValueOnce("random-string-second");
});

afterEach(() => {
  vi.restoreAllMocks();
});

const getTestBun = (): Ingredient => ({
  _id: "643d69a5c3f7b9001cfa093c",
  name: "Краторная булка N-200i",
  type: "bun",
  proteins: 80,
  fat: 24,
  carbohydrates: 53,
  calories: 420,
  price: 1255,
  image: "https://code.s3.yandex.net/react/code/bun-02.png",
  image_mobile: "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
  image_large: "https://code.s3.yandex.net/react/code/bun-02-large.png",
  __v: 0,
});

const getTestIngredient = (): Ingredient => ({
  _id: "643d69a5c3f7b9001cfa0941",
  name: "Биокотлета из марсианской Магнолии",
  type: "main",
  proteins: 420,
  fat: 142,
  carbohydrates: 242,
  calories: 4242,
  price: 424,
  image: "https://code.s3.yandex.net/react/code/meat-01.png",
  image_mobile: "https://code.s3.yandex.net/react/code/meat-01-mobile.png",
  image_large: "https://code.s3.yandex.net/react/code/meat-01-large.png",
  __v: 0,
});

const getStateOneIngredient = () =>
  reducer(
    getInitialState(),
    addIngredient({ ingredient: getTestIngredient() }),
  );

const getStateTwoIngredients = () =>
  reducer(
    getStateOneIngredient(),
    addIngredient({ ingredient: getTestIngredient() }),
  );

test("add bun", () => {
  expect(
    reducer(getInitialState(), addIngredient({ ingredient: getTestBun() })),
  ).toMatchSnapshot();
});

test("add ingredient", () => {
  expect(
    reducer(
      getInitialState(),
      addIngredient({ ingredient: getTestIngredient() }),
    ),
  ).toMatchSnapshot();
});

test("add second ingredient", () => {
  expect(
    reducer(
      getStateOneIngredient(),
      addIngredient({ ingredient: getTestIngredient() }),
    ),
  ).toMatchSnapshot();
});

test("remove ingredient", () => {
  expect(
    reducer(
      getStateOneIngredient(),
      removeIngredient({
        cartItemId: "random-string-first",
        ingeredient_id: getTestIngredient()._id,
      }),
    ),
  ).toMatchSnapshot();
});

test("move ingredient", () => {
  expect(
    reducer(
      getStateTwoIngredients(),
      moveIngredient({ oldIndex: "random-string-first", newIndex: 1 }),
    ),
  ).toMatchSnapshot();
});
