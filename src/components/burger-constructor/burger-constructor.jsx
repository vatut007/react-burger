import { useState } from "react";
import {
  Counter,
  DragIcon,
  CurrencyIcon,
  Button,
  ConstructorElement,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-constructor.module.css";

export function BurgerConstructor(props) {
  if (props.selectedBun == null) {
    return (
      <div>
        <p className="text text_type_main-default">
          Необходимо добавить ингредиенты и булки.
        </p>
        <div className={styles.currentOrder}>
          <p className="text text_type_digits-default">0</p>
          <CurrencyIcon type="primary" />
          <Button
            htmlType="button"
            type="primary"
            size="small"
            extraClass="ml-2"
          >
            Оформить заказ
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.order}>
      <div className={styles.constructorElement}>
        <ConstructorElement
          type="top"
          isLocked={true}
          text={props.selectedBun.name}
          price={props.selectedBun.price}
          thumbnail={props.selectedBun.image}
        />
        <div className={styles.burgerconstructor}>
          {props.selectedIngredients.map((ingedient, index) => (
            <div>
              <DragIcon type="primary" />
              <ConstructorElement
                isLocked={false}
                text={ingedient.name}
                price={ingedient.price}
                thumbnail={ingedient.image}
                handleClose={() => props.deleteIngedient(index)}
              />
            </div>
          ))}
        </div>
        <ConstructorElement
          type="bottom"
          isLocked={true}
          text={props.selectedBun.name}
          price={props.selectedBun.price}
          thumbnail={props.selectedBun.image}
        />
      </div>
      <div className={styles.currentOrder}>
        <p className="text text_type_digits-default">1234567890</p>
        <CurrencyIcon type="primary" />
        <Button htmlType="button" type="primary" size="small" extraClass="ml-2">
          Оформить заказ
        </Button>
      </div>
    </div>
  );
}
