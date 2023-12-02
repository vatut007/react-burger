import { Modal } from "../modal/modal";
import styles from "./ingredient-details.module.css"
import { IngredientDetailCalories } from "../ingredient-detail-calories/ingredient-detail-calories";

export function IngredientDetails(props){
    return(
        <Modal className={styles.modalContent}title = {'Детали ингредиента'} dialogRef={props.dialogRef}>
            <div className={styles.div}>
                <img className={styles.img} src={props.ingredient?.image}></img>
                <p className={styles.name + " text text_type_main-small"}>{props.ingredient?.name}</p>
                <IngredientDetailCalories ingredient={props.ingredient}/>
            </div>
        </Modal>
    )
}