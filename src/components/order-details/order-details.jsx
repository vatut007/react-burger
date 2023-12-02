import styles from "./order-details.module.css"
import { Modal } from "../modal/modal";
import { CheckMarkIcon } from "@ya.praktikum/react-developer-burger-ui-components";

export function OrderDetail (props){
    return (
        <Modal className={styles.modalContent} dialogRef={props.dialogRef}>
            <p className={styles.name + " text text_type_digits-medium"}>034536</p>
            <p className={styles.order + " text text_type_main-small"}>Индефикатор заказа</p>
            <div className={styles.checkMarkIcon}>
                <CheckMarkIcon type="primary" />
            </div>
            <p className={styles.order + " text text_type_main-small"}>Ваш заказ начали готовить</p>
            <p className={"text text_type_main-default text_color_inactive"}>Дождитесь готовности на орбитальной станции</p>
        </Modal>
      );
}