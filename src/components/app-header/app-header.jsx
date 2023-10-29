import {Logo, BurgerIcon, ListIcon, ProfileIcon, Box} from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './app-header.module.css'

export function AppHeader (){
    return(
        <header className={styles.header}>
            <nav><span  className={styles.icon} ><BurgerIcon  /></span> Конструктор</nav>
            <nav><span  className={styles.icon} ><ListIcon  /></span>Лента заказов</nav>
            <Logo />
            <nav><span   className={styles.icon} ><ProfileIcon /></span> Личный кабинет</nav>
        </header>
    )
}