import styles from './card-ingredients.module.css'

export function CardIngredient(props){
    return(
        <div className={styles.div}>
            <img src={props.image}></img>
            <p className="text text_type_digits-default">{props.price}</p>
            <p className={"text text_type_main-small" + styles.text}>{props.name}</p>
        </div>
    )
}