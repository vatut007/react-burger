import { OrderStatus } from "./ws-order";

export type Order = {
  number: number;
};

export type ResponseOrder = {
  name: string;
  orderNumber: number;
};

export type ApiResponseOrder = {
  success: boolean;
  name: string;
  order: Order;
};

export type GetOrderResponse = {
  success: boolean;
  orders: GetOrder[];
};

export type GetOrder = {
  _id: string;
  ingredients: string[];
  owner: string;
  status: OrderStatus;
  name: string;
  createdAt: string;
  updatedAt: string;
  number: number;
  __v: number;
};
