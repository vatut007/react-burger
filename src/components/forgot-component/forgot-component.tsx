import {
  Button,
  EmailInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./forgot-component.module.css";
import { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { usePasswordResetMutation } from "../../services/api/api-slice";

export function ForgotPassword() {
  let navigate = useNavigate();
  const [valueEmail, setValueEmail] = useState("");
  const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setValueEmail(e.target.value);
  };
  const [triger, { data, error, isLoading }] = usePasswordResetMutation();
  return (
    <div className={styles.forgotDiv}>
      <p className="text text_type_main-medium">Воостановление пароля</p>
      <EmailInput
        onChange={onChangeEmail}
        value={valueEmail}
        name={"email"}
        placeholder="Укажите Email"
      />
      <Button
        htmlType="button"
        type="primary"
        size="medium"
        onClick={async () => {
          const response = await triger({ email: valueEmail });
          if ("data" in response && response.data.success) {
            navigate("/forgot-password2", { replace: true });
          }
        }}
      >
        Воcстановить
      </Button>
      <div>
        <p className="text text_type_main-default">
          Вспомнили пароль? <Link to="/login">Войти</Link>
        </p>
      </div>
    </div>
  );
}
