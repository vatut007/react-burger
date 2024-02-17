import { Link, useLocation } from "react-router-dom";
import { useGetOrdersQuery } from "../../services/api/api-slice";
import { OrderTape } from "../order-tape/order-tape";

export function OrdersTapes() {
  const { data, isLoading, error } = useGetOrdersQuery(undefined);
  const orders = data?.orders;
  const location = useLocation();
  return orders?.map((order) => (
    <Link
      to={`/feed/${order.number}`}
      state={{ background: location }}
      key={order.number}
    >
      <OrderTape
        key={order._id}
        number={order.number}
        date={order.createdAt}
        name={order.name}
        ingredientIds={order.ingredients}
      />
    </Link>
  ));
}
