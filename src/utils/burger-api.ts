import { useEffect, useState } from "react";
import { NORMA_API } from "../constants";
import { IngredientList, IngredientListResponse } from "../types/ingredient";

export const checkReponse = (res: Response): Promise<IngredientListResponse> =>
  res.ok ? res.json() : res.json().then(Promise.reject);

export const getAllIngredients = (): Promise<IngredientListResponse> =>
  fetch(`${NORMA_API}/ingredients`).then(checkReponse);

type useAllIngredientsApiReturn =
  | [true, null, null]
  | [false, IngredientList, null]
  | [false, null, Error];
export function useAllIngredientsApi(): useAllIngredientsApiReturn {
  const [pending, setPending] = useState(true);
  const [data, setData] = useState<IngredientList | null>(null);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    setPending(true);

    getAllIngredients()
      .then((data) => {
        setPending(false);
        setData(data.data);
        setError(null);
      })
      .catch((error) => {
        setPending(false);
        setData(null);
        setError(error);
      });
  }, []);

  return [pending, data, error] as useAllIngredientsApiReturn;
}
