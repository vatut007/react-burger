import { OrdersTapes } from "../../../components/orders-tapes/orders-tapes";
import { Profile } from "../../../components/profile/profile";
import styles from "../profile.module.css"

export function ProfileFeedsPage(){
    return(
    <div className={styles.profileDiv}>
        <Profile/>
        <div className={styles.orders}>
        <OrdersTapes/>
        </div>
    </div>
    )
}