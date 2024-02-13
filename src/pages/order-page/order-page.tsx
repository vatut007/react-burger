import { Order } from "../../components/order/order";
import styles from "./order-page.module.css";

export function OrderPage() {
  return (
    <main className={styles.mainDiv}>
      <Order />
    </main>
  );
}
