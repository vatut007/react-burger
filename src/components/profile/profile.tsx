import {
  EmailInput,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./profile.module.css";
import { ChangeEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectSelectedAccessToken, selectSelectedUser } from "../../services/reducer/user/selector";
import { useNavigate } from "react-router-dom";
import { useUpdateProfileMutation } from "../../services/api/api-slice";
import { addUser, clearUser } from "../../services/reducer/user/actions";

export function Profile() {
  const navigate = useNavigate();
  const accessToken = useSelector(selectSelectedAccessToken);
  const dispatch = useDispatch();
  const user = useSelector(selectSelectedUser);
  const [name, setName] = useState(user?.name);
  const [email, setEmail] = useState(user?.email);
  const [password, setPassword] = useState('');
  const onChangeName = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };
  const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const [trigger, {data, error, isLoading}] = useUpdateProfileMutation();
  useEffect(()=>{
    if(user==null){
      navigate('/')
    }
  }, [])
  useEffect(()=>{
    trigger({email, name, password, token:accessToken})
  },[name, email, password] )
  const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  const logout = ()=>{
    localStorage.removeItem('refreshToken')
    navigate('/')
    dispatch(clearUser())
  }
  return (
    <div className={styles.profileDiv}>
      <div>
        <p className="text text_type_main-default">Профиль</p>
        <p className="text text_type_main-default">История заказов</p>
        <p className="text text_type_main-default" onClick={logout}>Выход</p>
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
          error = {false}
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
    </div>
  );
}
