import { OrderTape } from "../../components/order-tape/order-tape";
import { OrderTotal } from "../../components/order-total/order-total";
import { OrdersTapes } from "../../components/orders-tapes/orders-tapes";
import styles from "../feed/feed.module.css";

export function Feed() {
  return (
    <main className={styles.main}>
      <div className={styles.orders}>
        <OrdersTapes />
      </div>
      <div>
        <OrderTotal />
      </div>
    </main>
  );
}
