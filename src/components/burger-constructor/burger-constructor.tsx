import { useRef } from "react";
import {
  CurrencyIcon,
  Button,
  ConstructorElement,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-constructor.module.css";
import { OrderDetail } from "../order-details/order-details";
import { useDispatch, useSelector } from "react-redux";
import {
  selectSelectedBun,
  selectSelectedIngredients,
} from "../../services/reducer/burger-constructor/selectors";
import { addIngredient } from "../../services/reducer/burger-constructor/actions";
import { useOrderDetailMutation } from "../../services/api/api-slice";
import { useDrop } from "react-dnd";
import { Ingredient } from "../../types/ingredient";
import clsx from "clsx";
import { ConstructorElements } from "../constructor-element/constructor-elements";
import {
  selectSelectedAccessToken,
  selectSelectedUser,
} from "../../services/reducer/user/selector";
import { useNavigate } from "react-router-dom";

export function BurgerConstructor() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const selectedBun = useSelector(selectSelectedBun);
  const selectedIngredients = useSelector(selectSelectedIngredients);
  const dispatch = useDispatch();
  const [triger, { data, error, isLoading }] = useOrderDetailMutation();
  const [{ isHover }, dropTarget] = useDrop({
    accept: "ingredient",
    drop(ingredient: Ingredient) {
      dispatch(addIngredient({ ingredient }));
    },
    collect: (monitor) => ({
      isHover: monitor.isOver(),
    }),
  });
  const user = useSelector(selectSelectedUser);
  const accessToken = useSelector(selectSelectedAccessToken);
  const navigate = useNavigate();
  if (selectedBun == null) {
    return (
      <div ref={dropTarget}>
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
    <div
      className={clsx(styles.order, isHover && styles.dropOrder)}
      ref={dropTarget}
    >
      <div className={styles.constructorElement}>
        <ConstructorElement
          type="top"
          isLocked={true}
          text={selectedBun.name + "\n(верх)"}
          price={selectedBun.price}
          thumbnail={selectedBun.image}
        />
        <div className={styles.burgerconstructor}>
          {selectedIngredients.map((ingredient, index) => (
            <ConstructorElements
              ingredient={ingredient}
              index={index}
              key={ingredient.cart_item_id}
            />
          ))}
        </div>
        <ConstructorElement
          type="bottom"
          isLocked={true}
          text={selectedBun.name + "\n(низ)"}
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
            if (user == null) {
              navigate("/login");
            }
            dialogRef.current?.showModal();
            if (accessToken) {
              triger({
                ingredients: [selectedBun, ...selectedIngredients, selectedBun],
                token: accessToken,
              });
            }
          }}
        >
          Оформить заказ
        </Button>
        <OrderDetail
          dialogRef={dialogRef}
          orderNumber={data?.orderNumber}
          nameBurger={data?.name}
          isLoading={isLoading}
          error={error && ("error" in error ? error.error : String(error))}
        />
      </div>
    </div>
  );
}
