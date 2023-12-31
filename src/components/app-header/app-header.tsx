import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./app-header.module.css";

export function AppHeader() {
  return (
    <header className={styles.header}>
      <nav>
        <span className={styles.icon}>
          <BurgerIcon type="primary" />
        </span>{" "}
        Конструктор
      </nav>
      <nav>
        <span className={styles.icon}>
          <ListIcon type="primary" />
        </span>
        Лента заказов
      </nav>
      <Logo />
      <nav>
        <span className={styles.icon}>
          <ProfileIcon type="primary" />
        </span>{" "}
        Личный кабинет
      </nav>
    </header>
  );
}
