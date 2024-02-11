import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./app-header.module.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectSelectedUser } from "../../services/reducer/user/selector";

export function AppHeader() {
  const user = useSelector(selectSelectedUser);
  return (
    <header className={styles.header}>
      <nav>
      <Link to="/">
        <span className={styles.icon}>
          <BurgerIcon type="primary" />
        </span>{" "}
        Конструктор
      </Link>
      </nav>
      <nav>
      <Link to='/feed'>
        <span className={styles.icon}>
          <ListIcon type="primary" />
        </span>
        Лента заказов
      </Link>
      </nav>
      <Link to="/">
        <Logo />
      </Link>
      <nav>
        <Link to={user ? "/profile" : "/login"}>
          <span className={styles.icon}>
            <ProfileIcon type="primary" />
          </span>{" "}
          Личный кабинет
        </Link>
      </nav>
    </header>
  );
}
