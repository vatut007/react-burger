import {
  Button,
  EmailInput,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { ChangeEvent, useState } from "react";
import styles from "./input-login.module.css";
import { Link } from "react-router-dom";

export function InputLogin() {
  const [valueEmail, setValueEmail] = useState("bob@example.com");
  const [valuePassword, setValuePassword] = useState("password");
  const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setValueEmail(e.target.value);
  };
  const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setValuePassword(e.target.value);
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
      <Button htmlType="button" type="primary" size="medium">
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
