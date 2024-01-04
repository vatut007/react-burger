import { ChangeEvent, useRef, useState } from "react";
import styles from "./registration.module.css";
import {
  Button,
  EmailInput,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";

export function Registration() {
  const [valueEmail, setValueEmail] = useState("bob@example.com");
  const [valuePassword, setValuePassword] = useState("password");
  const [value, setValue] = useState("Ильяс");
  const inputRef = useRef(null);
  const onIconClick = () => {
    setTimeout(() => inputRef.current.focus(), 0);
    alert("Icon Click Callback");
  };
  const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setValueEmail(e.target.value);
  };
  const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setValuePassword(e.target.value);
  };
  return (
    <div className={styles.registartionDiv}>
      <p className="text text_type_main-medium">Регистрация</p>
      <Input
        type={"text"}
        placeholder={"Имя"}
        onChange={(e) => setValue(e.target.value)}
        value={value}
        name={"name"}
        error={false}
        ref={inputRef}
        onIconClick={onIconClick}
        errorText={"Ошибка"}
        size={"default"}
        extraClass="ml-1"
      />
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
        Зарегистроваться
      </Button>
      <div>
        <p className="text text_type_main-default">
          Уже зарегистрированны? Войти
        </p>
      </div>
    </div>
  );
}
