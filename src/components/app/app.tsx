import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
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
import { AppRoutes } from "../routes/routes";

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
      <AppRoutes />
    </Router>
  );
}
export default App;
