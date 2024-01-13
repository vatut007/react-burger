import {
  Button,
  EmailInput,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { ChangeEvent, useState } from "react";
import styles from "./input-login.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../services/api/api-slice";
import { useDispatch } from "react-redux";
import { addAccessToken, addRefreshToken, addUser } from "../../services/reducer/user/actions";
import { ResponseRegistration } from "../../types/registration";

export function InputLogin() {
  let navigate = useNavigate();
  const [valueEmail, setValueEmail] = useState("");
  const [valuePassword, setValuePassword] = useState("");
  const dispatch = useDispatch();
  const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setValueEmail(e.target.value);
  };
  const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setValuePassword(e.target.value);
  };
  const [trigger, {data, error, isLoading}] = useLoginMutation();
  const updateUserStorage = (data: ResponseRegistration) => {
    dispatch(addUser({ email: data?.user.email, name: data.user.name }));
    dispatch(addAccessToken({ accessToken: data.accessToken }));
    dispatch(addRefreshToken({ refreshToken: data.refreshToken }));
    localStorage.setItem("refreshToken", data.refreshToken);
  };
  return (
    <div className={styles.loginDiv}>
      <p className="text text_type_main-medium">Вход</p>
      <EmailInput
        onChange={onChangeEmail}
        value={valueEmail}
        name={"email"}
        isIcon={true}
        extraClass="mb-2"
      />
      <PasswordInput
        onChange={onChangePassword}
        value={valuePassword}
        name={"password"}
        extraClass="mb-2"
      />
      <Button htmlType="button" type="primary" size="medium" onClick={async () => {
          const response = await trigger({
            email: valueEmail,
            password: valuePassword,
          });
          if ("data" in response && response.data.success) {
            updateUserStorage(response.data);
            navigate("/");
          }
        }}>
        Войти
      </Button>
      <div>
        <p className="text text_type_main-default">
          Вы - новый пользователь? <Link to="/register">Зарегистроваться</Link>
        </p>
        <p className="text text_type_main-default">
          Забыли пароль? <Link to="/forgot-password">Воостановить пароль</Link>
        </p>
      </div>
    </div>
  );
}
