import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { NORMA_API } from "../../constants";
import {
  IngredientList,
  type IngredientListResponse,
} from "../../types/ingredient";
import { ApiResponseOrder, ResponseOrder } from "../../types/order";

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
    orderDetail: builder.mutation<ResponseOrder, IngredientList>({
      query: (ingredientList) => ({
        url: "orders",
        method: "POST",
        body: {
          ingredients: ingredientList.map((ingredient) => ingredient._id),
        },
      }),
      transformResponse(baseQueryReturnValue: ApiResponseOrder) {
        return {
          name: baseQueryReturnValue.name,
          orderNumber: baseQueryReturnValue.order.number,
        };
      },
    }),
  }),
});

export const { useGetAllIngredientQuery, useOrderDetailMutation } = apiSlice;
