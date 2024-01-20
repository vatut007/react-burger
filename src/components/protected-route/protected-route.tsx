import { useDispatch, useSelector } from "react-redux";
import { useEffect, type ReactNode } from "react";
import {
  selectSelectedAccessToken,
  selectSelectedUser,
} from "../../services/reducer/user/selector";
import { Navigate, useLocation } from "react-router-dom";
import { useUpdateAccessTokenMutation } from "../../services/api/api-slice";
import {
  addAccessToken,
  addRefreshToken,
} from "../../services/reducer/user/actions";

interface ModalProps {
  children: ReactNode;
  anonymous?: boolean;
}

export function ProtectedRoute({ children, anonymous = false }: ModalProps) {
  const user = useSelector(selectSelectedUser);
  const location = useLocation();
  const from = location.state?.from || "/";
  // Если разрешен неавторизованный доступ, а пользователь авторизован...
  if (anonymous && user) {
    // ...то отправляем его на предыдущую страницу
    return <Navigate to={from} />;
  }
  // Если требуется авторизация, а пользователь не авторизован...
  if (!anonymous && !user) {
    // ...то отправляем его на страницу логин
    return <Navigate to="/login" state={{ from: location }} />;
  }
  // Если все ок, то рендерим внутреннее содержимое
  return children;
}
