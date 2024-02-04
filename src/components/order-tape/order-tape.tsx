import styles from '../order-tape/order-tape.module.css'

export function OrderTape(){
    return(
        <div>
            <div className={styles.title}>
                <p className="text text_type_main-default">#034535</p>
                <p className="text text_type_main-default text_color_inactive"> Сегодня, 16:20 i-GMT+3</p>
            </div>
            <div>
            <p className="text text_type_main-medium">Death Star Startship Main бургер</p>
            </div>
            <div className={styles.pictures}>
                <div className={styles.picture}>
                    <img src='https://code.s3.yandex.net/react/code/bun-02.png' alt='Картинка' className={styles.img}></img>
                </div>
                <div className={styles.picture}>
                <img src='https://code.s3.yandex.net/react/code/bun-02.png' alt='Картинка' className={styles.img}></img>
                </div>
            </div>
        </div>
    )
}