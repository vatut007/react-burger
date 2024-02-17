import { OrdersTapesUser } from "../../../components/orders-tapes-user/orders-tapes";
import { OrdersTapes } from "../../../components/orders-tapes/orders-tapes";
import { Profile } from "../../../components/profile/profile";
import styles from "../profile.module.css";

export function ProfileFeedsPage() {
  return (
    <div className={styles.profileDiv}>
      <Profile />
      <div className={styles.orders}>
        <OrdersTapesUser />
      </div>
    </div>
  );
}
