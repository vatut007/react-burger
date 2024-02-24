import { Link, useLocation } from "react-router-dom";
import {
  useGetOrdersQuery,
  useGetOrdersUserQuery,
} from "../../services/api/api-slice";
import { OrderTape } from "../order-tape/order-tape";
import { useSelector } from "react-redux";
import { selectSelectedAccessToken } from "../../services/reducer/user/selector";

export function OrdersTapesUser() {
  const accessToken = useSelector(selectSelectedAccessToken);
  const { data, isLoading, error } = useGetOrdersUserQuery(
    accessToken ? accessToken : "",
  );
  const orders = data?.orders;
  const location = useLocation();
  return orders?.map((order) => (
    <Link
      to={`/profile/orders/${order.number}`}
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
