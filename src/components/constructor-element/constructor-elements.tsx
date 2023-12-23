import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import {
  moveIngredient,
  removeIngredient,
} from "../../services/reducer/burger-constructor/actions";
import { useDispatch } from "react-redux";
import { IngredientConstructor } from "../../types/ingredient";
import { useDrag, useDrop } from "react-dnd";
import styles from "./constructor-elements.module.css";
import clsx from "clsx";

interface ContuctorElementsProps {
  ingredient: IngredientConstructor;
  index: number;
}

interface Item {
  cartItemId: string;
  index: number;
}

export function ConstructorElements({
  ingredient,
  index,
}: ContuctorElementsProps) {
  const dispatch = useDispatch();
  const cartItemId = ingredient.cart_item_id;
  const [{ isDragging }, dragSourceRef] = useDrag({
    type: "selectIngredient",
    item: { cartItemId, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    end: (item, monitor) => {
      const { cartItemId: dropperId, index } = item;
      const didDrop = monitor.didDrop();
      if (!didDrop) {
        dispatch(moveIngredient({ oldIndex: dropperId, newIndex: index }));
      }
    },
  });
  const [, drop] = useDrop({
    accept: "selectIngredient",
    hover({ cartItemId: draggedId }: Item) {
      if (draggedId !== cartItemId) {
        const overIndex = index;
        dispatch(moveIngredient({ oldIndex: draggedId, newIndex: overIndex }));
      }
    },
  });
  return (
    <div
      className={clsx(styles.elementDiv, isDragging && styles.dropElementDiv)}
      ref={(node) => dragSourceRef(drop(node))}
    >
      <div className={styles.dragIcon}>
        <DragIcon type="primary" />
      </div>
      <ConstructorElement
        isLocked={false}
        text={ingredient.name}
        price={ingredient.price}
        thumbnail={ingredient.image}
        handleClose={() =>
          dispatch(
            removeIngredient({
              cartItemId: ingredient.cart_item_id,
              ingeredient_id: ingredient._id,
            }),
          )
        }
      />
    </div>
  );
}
