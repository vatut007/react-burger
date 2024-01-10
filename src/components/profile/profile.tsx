import {
  EmailInput,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./profile.module.css";
import { ChangeEvent, useState } from "react";

export function Profile() {
  const [name, setName] = useState("Вася");
  const onChangeName = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  return (
    <div className={styles.profileDiv}>
      <div>
        <p className="text text_type_main-default">Профиль</p>
        <p className="text text_type_main-default">История заказов</p>
        <p className="text text_type_main-default">Выход</p>
        <p className="text text_type_main-default text_color_inactive">
          В этом разделе вы можете изменить свои персональные данные
        </p>
      </div>
      <div>
        <EmailInput
          onChange={onChangeName}
          value={name}
          isIcon={true}
          extraClass="mb-2"
          placeholder="Имя"
        />
        <EmailInput
          onChange={onChangeName}
          value={name}
          isIcon={true}
          extraClass="mb-2"
          placeholder="Логин"
        />
        <PasswordInput
          onChange={onChangeName}
          value={name}
          name={"password"}
          extraClass="mb-2"
          icon="EditIcon"
        />
      </div>
    </div>
  );
}
