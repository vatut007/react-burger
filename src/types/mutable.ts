import { type MutableRefObject } from "react";
import { IngredientType } from "./ingredient";

export type SelectIngredient = Partial<Record<IngredientType, HTMLDivElement>>;
