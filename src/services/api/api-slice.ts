import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { NORMA_API } from "../../constants";
import {
  IngredientList,
  RequestIngredient,
  type IngredientListResponse,
  Ingredient,
} from "../../types/ingredient";
import {
  ApiResponseOrder,
  GetOrder,
  GetOrderResponse,
  ResponseOrder,
} from "../../types/order";
import { RequestPassword, ResponsePasswordReset } from "../../types/password";
import {
  RequestRegistration,
  ResponseRegistration,
} from "../../types/registration";
import {
  RequestUpdateToken,
  ResponseUpdateToken,
} from "../../types/updateToken";
import { ResponseGetUser, User } from "../../types/user";
import { RequestLogin, ResponseLogin } from "../../types/login";
import { RequestUpdateUser, ResponseUpdateUser } from "../../types/update-user";
import { WsOrders } from "../../types/ws-order";
import { createEntityAdapter } from "@reduxjs/toolkit";

const ingredientAdapter = createEntityAdapter({
  selectId: (ingredient: Ingredient) => ingredient._id,
});
const ingredientInitialState = ingredientAdapter.getInitialState();
export const ingredientSelectors = ingredientAdapter.getSelectors();

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: NORMA_API }),
  endpoints: (builder) => ({
    getAllIngredient: builder.query<typeof ingredientInitialState, undefined>({
      query: () => `/ingredients`,
      transformResponse({ data }: IngredientListResponse) {
        return ingredientAdapter.setAll(ingredientInitialState, data);
      },
    }),
    orderDetail: builder.mutation<ResponseOrder, RequestIngredient>({
      query: ({ ingredients, token }) => ({
        url: "orders",
        headers: { authorization: token },
        method: "POST",
        body: {
          ingredients: ingredients.map((ingredient) => ingredient._id),
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
      query: ({ email }) => ({
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
    registration: builder.mutation<ResponseRegistration, RequestRegistration>({
      query: ({ email, password, name }) => ({
        url: "auth/register",
        method: "POST",
        body: {
          email: email,
          password: password,
          name: name,
        },
      }),
    }),
    updateAccessToken: builder.mutation<
      ResponseUpdateToken,
      RequestUpdateToken
    >({
      query: ({ refreshToken }) => ({
        url: "auth/token",
        method: "POST",
        body: {
          token: refreshToken,
        },
      }),
    }),
    getUser: builder.query<User, string>({
      query: (token) => ({
        url: `/auth/user`,
        headers: { authorization: token },
      }),
      transformResponse(baseQueryReturnValue: ResponseGetUser) {
        return baseQueryReturnValue.user;
      },
    }),
    login: builder.mutation<ResponseLogin, RequestLogin>({
      query: ({ email, password }) => ({
        url: "auth/login",
        method: "POST",
        body: {
          email: email,
          password: password,
        },
      }),
    }),
    updateProfile: builder.mutation<ResponseUpdateUser, RequestUpdateUser>({
      query: (user: RequestUpdateUser) => ({
        url: "auth/user",
        headers: { authorization: user.token },
        method: "PATCH",
        body: {
          email: user.email,
          name: user.name,
          password: user.password,
        },
      }),
    }),
    getOrders: builder.query<WsOrders, undefined>({
      query: () => `orders/all`,
      async onCacheEntryAdded(
        arg,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved },
      ) {
        const ws = new WebSocket("wss://norma.nomoreparties.space/orders/all");
        try {
          await cacheDataLoaded;
          const listener = (event: MessageEvent) => {
            const data: WsOrders = JSON.parse(event.data);
            updateCachedData((draft) => {
              return data;
            });
          };

          ws.addEventListener("message", listener);
        } catch {}
        await cacheEntryRemoved;
        ws.close();
      },
    }),
    getOrder: builder.query<GetOrder, string>({
      query: (orderNumber: string) => ({
        url: `orders/${orderNumber}`,
      }),
      transformResponse(baseQueryReturnValue: GetOrderResponse) {
        return baseQueryReturnValue.orders[0];
      },
    }),
    getOrdersUser: builder.query<WsOrders, string>({
      query: (token) => ({
        url: `orders/`,
        headers: { authorization: token },
      }),
      async onCacheEntryAdded(
        token,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved },
      ) {
        const ws = new WebSocket(
          `wss://norma.nomoreparties.space/orders/all/?token=${token.replace(
            "Bearer ",
            "",
          )}`,
        );
        try {
          await cacheDataLoaded;
          const listener = (event: MessageEvent) => {
            const data: WsOrders = JSON.parse(event.data);
            updateCachedData((draft) => {
              return data;
            });
          };

          ws.addEventListener("message", listener);
        } catch {}
        await cacheEntryRemoved;
        ws.close();
      },
    }),
  }),
});

export const {
  useGetAllIngredientQuery,
  useOrderDetailMutation,
  usePasswordResetMutation,
  useRegistrationMutation,
  useUpdateAccessTokenMutation,
  useGetUserQuery,
  useLoginMutation,
  useUpdateProfileMutation,
  useGetOrdersQuery,
  useGetOrderQuery,
  useGetOrdersUserQuery,
} = apiSlice;
