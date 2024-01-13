import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HomePage } from "../../pages/home-page/home-page";
import { LoginPage } from "../../pages/login/login";
import { RegisterPage } from "../../pages/register/register";
import { ForgotPasswordPage } from "../../pages/forgot-password/forgot-password";
import { ForgotPassword2Page } from "../../pages/forgot-password2/forgot-password2";
import { ProfilePage } from "../../pages/profile/profile";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addAccessToken,
  addRefreshToken,
  addUser,
} from "../../services/reducer/user/actions";
import { selectSelectedAccessToken } from "../../services/reducer/user/selector";
import {
  useGetUserQuery,
  useUpdateAccessTokenMutation,
} from "../../services/api/api-slice";

function App() {
  const dispath = useDispatch();
  const [trigger, { isLoading: tokenLoading }] = useUpdateAccessTokenMutation();
  const accessToken = useSelector(selectSelectedAccessToken);
  const {
    data,
    error,
    isLoading: userLoading,
  } = useGetUserQuery(accessToken ?? "", {
    skip: !accessToken,
  });
  const isLoading = tokenLoading || userLoading;
  useEffect(() => {
    const refreshToken = localStorage.getItem("refreshToken");
    console.log(refreshToken);
    if (refreshToken) {
      if (accessToken == null) {
        const updateToken = async () => {
          const response = await trigger({ refreshToken });
          if ("data" in response && response.data.success) {
            const { accessToken, refreshToken } = response.data;
            localStorage.setItem("refreshToken", refreshToken);
            dispath(addAccessToken({ accessToken }));
            dispath(addRefreshToken({ refreshToken }));
          }
        };
        updateToken();
      }
    }
  }, []);
  useEffect(() => {
    if (data) {
      dispath(addUser(data));
    }
  }, [data]);

  if (isLoading) {
    return <div>Пожалуйста подождите</div>;
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/forgot-password2" element={<ForgotPassword2Page />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </Router>
  );
}
export default App;
