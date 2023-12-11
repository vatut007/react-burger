import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { NORMA_API } from "../../constants";
import {
  IngredientList,
  type IngredientListResponse,
} from "../../types/ingredient";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: NORMA_API }),
  endpoints: (builder) => ({
    getAllIngredient: builder.query<IngredientList, undefined>({
      query: () => `/ingredients`,
      transformResponse(baseQueryReturnValue: IngredientListResponse) {
        return baseQueryReturnValue.data;
      },
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetAllIngredientQuery } = apiSlice;
