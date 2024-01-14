import { ChangeEvent, useRef, useState } from "react";
import styles from "./registration.module.css";
import {
  Button,
  EmailInput,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useNavigate } from "react-router-dom";
import { useRegistrationMutation } from "../../services/api/api-slice";
import { useDispatch } from "react-redux";
import {
  addAccessToken,
  addRefreshToken,
  addUser,
} from "../../services/reducer/user/actions";
import { ResponseRegistration } from "../../types/registration";

export function Registration() {
  let navigate = useNavigate();
  const [valueEmail, setValueEmail] = useState("bob@example.com");
  const [valuePassword, setValuePassword] = useState("password");
  const [value, setValue] = useState("Ильяс");
  const inputRef = useRef(null);
  const dispatch = useDispatch();
  const [triger, { data, error, isLoading }] = useRegistrationMutation();
  const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setValueEmail(e.target.value);
  };
  const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setValuePassword(e.target.value);
  };
  const updateUserStorage = (data: ResponseRegistration) => {
    dispatch(addUser({ email: data?.user.email, name: data.user.name }));
    dispatch(addAccessToken({ accessToken: data.accessToken }));
    dispatch(addRefreshToken({ refreshToken: data.refreshToken }));
    localStorage.setItem("refreshToken", data.refreshToken);
  };
  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        const response = await triger({
          email: valueEmail,
          password: valuePassword,
          name: value,
        });
        if ("data" in response && response.data.success) {
          updateUserStorage(response.data);
          navigate("/");
        }
      }}
    >
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
        <Button htmlType="submit" type="primary" size="medium">
          Зарегистроваться
        </Button>
        <div>
          <p className="text text_type_main-default">
            Уже зарегистрированны? <Link to="/login">Войти</Link>
          </p>
        </div>
      </div>
    </form>
  );
}
