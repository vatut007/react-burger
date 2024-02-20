import styles from "./profile.module.css";
import { useDispatch} from "react-redux";
import { Link, useNavigate} from "react-router-dom";
import { clearUser } from "../../services/reducer/user/actions";
import { ProfileInput } from "../profile-input/profile-input";

export function Profile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const logout = () => {
    localStorage.removeItem("refreshToken");
    navigate("/");
    dispatch(clearUser());
  };
  return (
    <div className={styles.profileDiv}>
      <div>
        <Link to='/profile'>
        <p className="text text_type_main-default">Профиль</p>
        </Link>
        <Link to='/profile/orders'>
        <p className="text text_type_main-default">История заказов</p>
        </Link>
        <p className="text text_type_main-default" onClick={logout}>
          Выход
        </p>
        <p className="text text_type_main-default text_color_inactive">
          В этом разделе вы можете изменить свои персональные данные
        </p>
      </div>
    </div>
  );
}
