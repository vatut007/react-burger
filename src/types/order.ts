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
