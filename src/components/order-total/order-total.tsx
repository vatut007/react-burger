import { useMemo } from "react";
import { useGetOrdersQuery } from "../../services/api/api-slice";
import styles from "./order-total.module.css";
import clsx from "clsx";

export function OrderTotal() {
  const { data, isLoading, error } = useGetOrdersQuery(undefined);
  const ordersDone = useMemo(
    () => data?.orders.filter((order) => order.status == "done"),
    [data],
  );
  const ordersPending = useMemo(
    () => data?.orders.filter((order) => order.status == "pending"),
    [data],
  );
  return (
    <div className={styles.totals}>
      <div className={styles.workings}>
        <div>
          <p className="text text_type_main-small">Готовы:</p>
          <div className={styles.ordersDone}>
            {ordersDone?.map((order) => (
              <p
                className={clsx(
                  "text text_type_main-small",
                  styles.orderNumber,
                )}
                key={order._id}
              >
                {order.number}
              </p>
            ))}
          </div>
        </div>
        <div>
          <p className="text text_type_main-small">В работе:</p>
          <div className={styles.ordersDone}>
            {ordersPending?.map((order) => (
              <p className="text text_type_main-small">{order.number}</p>
            ))}
          </div>
        </div>
      </div>
      <div className={styles.totalAll}>
        <p className="text text_type_main-medium">Выполнено за всё время</p>
        <p className="text text_type_digits-large">
          {Intl.NumberFormat("ru").format(data?.total ? data.total : 0)}
        </p>
      </div>
      <div className={styles.totalToday}>
        <p className="text text_type_main-medium">Выполнено за сегодня</p>
        <p className="text text_type_digits-large">{data?.totalToday}</p>
      </div>
    </div>
  );
}
