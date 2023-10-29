export function CardIngredient(props){
    return(
        <div>
            <img src={props.image}></img>
            <p className="text text_type_digits-default">{props.price}</p>
            <p className="text text_type_main-small">{props.name}</p>
        </div>
    )
}