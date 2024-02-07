import { useGetOrdersQuery } from "../../services/api/api-slice";
import { OrderTape } from "../order-tape/order-tape";

export function OrdersTapes() {
  const { data, isLoading, error } = useGetOrdersQuery(undefined);
  const orders = data?.orders;
  return orders?.map((order) => (
    <OrderTape
      key={order._id}
      number={order.number}
      date={order.date}
      name={order.name}
      ingredientIds={order.ingredients}
    />
  ));
}
