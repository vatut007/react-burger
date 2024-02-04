import { OrderTape } from "../../components/order-tape/order-tape";
import styles from '../feed/feed.module.css'

export function Feed (){
    return (
        <main className={styles.main}>
        <OrderTape/>
        <OrderTape/>
        </main>
    )
}