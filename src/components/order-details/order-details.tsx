import styles from "./order-details.module.css";
import { Modal } from "../modal/modal";
import { CheckMarkIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { RefObject } from "react";
import { Loading } from "../loading/loadng";
import { Error } from "../error/error";

interface OrderDetailProps {
  dialogRef: RefObject<HTMLDialogElement>;
  orderNumber: number | undefined;
  nameBurger: string | undefined;
  isLoading: boolean;
  error: string | undefined;
}

export function OrderDetail(props: OrderDetailProps) {
  return (
    <Modal className={styles.modalContent} dialogRef={props.dialogRef}>
      <p className={styles.name + " text text_type_digits-medium"}>
        {props.orderNumber}
      </p>
      <p className={styles.order + " text text_type_main-small"}>
        {props.nameBurger}
      </p>
      <div className={styles.checkMarkIcon}>
        <CheckMarkIcon type="primary" />
      </div>
      {!props.isLoading ? (
        <p className={styles.order + " text text_type_main-small"}>
          "Ваш заказ начали готовить"
        </p>
      ) : (
        <Loading />
      )}
      {!props.error ? (
        <p className={"text text_type_main-default text_color_inactive"}>
          "Дождитесь готовности на орбитальной станции"
        </p>
      ) : (
        <Error error={props.error} />
      )}
    </Modal>
  );
}
