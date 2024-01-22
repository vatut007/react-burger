import {
  Button,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./forgot-component2.module.css";
import { ChangeEvent, useState } from "react";

export function ForgotPassword2() {
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  const onChangeCode = (e: ChangeEvent<HTMLInputElement>) => {
    setCode(e.target.value);
  };
  return (
    <div className={styles.forgotDiv}>
      <p className="text text_type_main-medium">Воостановление пароля</p>
      <PasswordInput
        onChange={onChangePassword}
        value={password}
        name={"password"}
        extraClass="mb-2"
        placeholder="Введите новый пароль"
      />
      <Input
        type={"text"}
        placeholder={"Введите код из письма"}
        onChange={onChangeCode}
        value={code}
      />
      <Button htmlType="button" type="primary" size="medium">
        Сохранить
      </Button>
      <div>
        <p className="text text_type_main-default">Вспомнили пароль? Войти</p>
      </div>
    </div>
  );
}
