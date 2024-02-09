import { Ingredient } from "./ingredient";

export type Channel = "redux" | "general";

export type WsOrders = {
  success: boolean;
  orders: WsOrder[];
  total: number;
  totalToday: number;
};

export type WsOrder = {
  ingredients: Ingredient["_id"][];
  _id: string;
  status: OrderStatus;
  number: string;
  name: string;
  date: string;
  createdAt: string;
  updatedAt: string;
};

export type OrderStatus = "done" | "cancel" | "pending";
