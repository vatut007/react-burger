import { useGetOrdersQuery } from "../../services/api/api-slice";

export function OrderTotal() {
  const { data, isLoading, error } = useGetOrdersQuery(undefined);
  return <p>{data?.totalToday}</p>;
}
