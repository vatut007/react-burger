import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { NORMA_API } from "../../constants";
import {
  IngredientList,
  RequestIngredient,
  type IngredientListResponse,
  Ingredient,
} from "../../types/ingredient";
import { ApiResponseOrder, ResponseOrder } from "../../types/order";
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
        // create a websocket connection when the cache subscription starts
        const ws = new WebSocket("wss://norma.nomoreparties.space/orders/all");
        try {
          // wait for the initial query to resolve before proceeding
          await cacheDataLoaded;

          // when data is received from the socket connection to the server,
          // if it is a message and for the appropriate channel,
          // update our query result with the received message
          const listener = (event: MessageEvent) => {
            const data: WsOrders = JSON.parse(event.data);
            updateCachedData((draft) => {
              return data;
            });
          };

          ws.addEventListener("message", listener);
        } catch {
          // no-op in case `cacheEntryRemoved` resolves before `cacheDataLoaded`,
          // in which case `cacheDataLoaded` will throw
        }
        // cacheEntryRemoved will resolve when the cache subscription is no longer active
        await cacheEntryRemoved;
        // perform cleanup steps once the `cacheEntryRemoved` promise resolves
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
} = apiSlice;
