import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { NORMA_API } from "../../constants";
import {
  IngredientList,
  type IngredientListResponse,
} from "../../types/ingredient";
import { ApiResponseOrder, ResponseOrder } from "../../types/order";
import { RequestPassword, ResponsePasswordReset } from "../../types/password";
import { RequestRegistration, ResponseRegistration } from "../../types/registration";

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
    passwordReset: builder.mutation<ResponsePasswordReset, RequestPassword>({
      query: ({email}) => ({
        url: "password-reset",
        method: "POST",
        body: {
          email: email,
        },
      }),
      transformResponse(baseQueryReturnValue: ResponsePasswordReset) {
        return {
          success: baseQueryReturnValue.success,
          message: baseQueryReturnValue.message,
        };
      },
    }),
    registration: builder.mutation< ResponseRegistration, RequestRegistration>({
      query: ({email,password,name})=>({
        url: "auth/register",
        method: "POST",
        body:{
          email:email,
          password:password,
          name: name
        }
      })
    })
  }),
});

export const {
  useGetAllIngredientQuery,
  useOrderDetailMutation,
  usePasswordResetMutation,
  useRegistrationMutation
} = apiSlice;
