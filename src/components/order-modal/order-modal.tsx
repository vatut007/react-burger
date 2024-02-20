import { useNavigate, useParams } from "react-router"
import { Modal } from "../modal/modal";
import { Order } from "../order/order";
import { RefObject, useEffect } from "react";
import styles from './order-modal.module.css'

interface OrderModalProps {
    dialogRef: RefObject<HTMLDialogElement>;
    type: 'user'|'all'
  }

export function OrderModal(props: OrderModalProps){
    const {orderNumber} = useParams();
    const navigate = useNavigate();
    useEffect(() => {
      if (!orderNumber) return;
      props.dialogRef.current?.showModal();
    }, [orderNumber]);
    return(<Modal
        className={styles.modalContent}
        dialogRef={props.dialogRef}
        onClose={() => navigate(props.type=='all'?"/feed":'/profile/orders')}
    ><Order/></Modal>)
}