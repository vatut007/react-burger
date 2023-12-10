import { useRef } from "react";
import {
  DragIcon,
  CurrencyIcon,
  Button,
  ConstructorElement,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-constructor.module.css";
import { OrderDetail } from "../order-details/order-details";
import { type Ingredient } from "../../types/ingredient";
import { useDispatch, useSelector } from "react-redux";
import {
  selectSelectedBun,
  selectSelectedIngredients,
} from "../../services/reducer/burger-constructor/selectors";
import { removeIngredient } from "../../services/reducer/burger-constructor/actions";

export function BurgerConstructor() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const selectedBun = useSelector(selectSelectedBun);
  const selectedIngredients = useSelector(selectSelectedIngredients);
  const dispatch = useDispatch();

  if (selectedBun == null) {
    return (
      <div>
        <p className="text text_type_main-default">
          Необходимо добавить ингредиенты и булки.
        </p>
        <div className={styles.currentOrder}>
          <p className="text text_type_digits-default">0</p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    );
  }
  const summIngredients = selectedIngredients.reduce(
    (sum, current) => sum + current.price,
    0,
  );
  const summBun = selectedBun.price * 2;
  const summ = summIngredients + summBun;
  return (
    <div className={styles.order}>
      <div className={styles.constructorElement}>
        <ConstructorElement
          type="top"
          isLocked={true}
          text={selectedBun.name}
          price={selectedBun.price}
          thumbnail={selectedBun.image}
        />
        <div className={styles.burgerconstructor}>
          {selectedIngredients.map((ingedient, index) => (
            <div key={String(ingedient._id) + "_" + String(index)}>
              <DragIcon type="primary" />
              <ConstructorElement
                isLocked={false}
                text={ingedient.name}
                price={ingedient.price}
                thumbnail={ingedient.image}
                handleClose={() => dispatch(removeIngredient({ index }))}
              />
            </div>
          ))}
        </div>
        <ConstructorElement
          type="bottom"
          isLocked={true}
          text={selectedBun.name}
          price={selectedBun.price}
          thumbnail={selectedBun.image}
        />
      </div>
      <div className={styles.currentOrder}>
        <p className="text text_type_digits-default">{summ}</p>
        <CurrencyIcon type="primary" />
        <Button
          htmlType="button"
          type="primary"
          size="small"
          extraClass="ml-2"
          onClick={() => {
            dialogRef.current?.showModal();
          }}
        >
          Оформить заказ
        </Button>
        <OrderDetail dialogRef={dialogRef} />
      </div>
    </div>
  );
}
