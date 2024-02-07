import { OrderTape } from "../../components/order-tape/order-tape";
import { OrderTotal } from "../../components/order-total/order-total";
import styles from "../feed/feed.module.css";

export function Feed() {
  return (
    <main className={styles.main}>
      <OrderTape />
      <OrderTotal />
    </main>
  );
}
