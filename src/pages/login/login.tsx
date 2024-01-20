import { useSelector } from "react-redux";
import { InputLogin } from "../../components/input-login/input-login";
import { selectSelectedUser } from "../../services/reducer/user/selector";
import { useNavigate, redirect, Navigate, useLocation, useSearchParams} from "react-router-dom";

export function LoginPage() {
  const user = useSelector(selectSelectedUser);
  const location = useLocation();
  const from = location.state?.from || "/";
  if ( user) {
    return <Navigate to={from} />;
  }
  return (
    <div className="">
      <InputLogin />
    </div>
  );
}
