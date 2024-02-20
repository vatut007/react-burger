import {
    EmailInput,
    PasswordInput,
  } from "@ya.praktikum/react-developer-burger-ui-components";
import { ChangeEvent, useEffect, useState } from "react";
import {
    selectSelectedAccessToken,
    selectSelectedUser,
  } from "../../services/reducer/user/selector";
import { useSelector } from "react-redux";
import { useUpdateProfileMutation } from "../../services/api/api-slice";

export function ProfileInput(){
    const user = useSelector(selectSelectedUser);
    const [name, setName] = useState(user?.name);
    const [email, setEmail] = useState(user?.email);
    const accessToken = useSelector(selectSelectedAccessToken);
    const [password, setPassword] = useState("");
    const onChangeName = (e: ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
      };
      const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
      };
      const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
      };
    const [trigger, { data, error, isLoading }] = useUpdateProfileMutation();
  useEffect(() => {
    trigger({ email, name, password, token: accessToken });
  }, [name, email, password]);
    return(
        <div>
        <EmailInput
          onChange={onChangeName}
          value={name}
          isIcon={true}
          extraClass="mb-2"
          placeholder="Имя"
          error={false}
        />
        <EmailInput
          onChange={onChangeEmail}
          value={email}
          isIcon={true}
          extraClass="mb-2"
          placeholder="email"
        />
        <PasswordInput
          onChange={onChangePassword}
          value={password}
          name={"password"}
          extraClass="mb-2"
          icon="EditIcon"
        />
      </div>
    )
}