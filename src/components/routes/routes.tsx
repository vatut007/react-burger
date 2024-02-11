import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { useEffect } from "react";
import { HomePage } from "../../pages/home-page/home-page";
import { LoginPage } from "../../pages/login/login";
import { RegisterPage } from "../../pages/register/register";
import { ForgotPasswordPage } from "../../pages/forgot-password/forgot-password";
import { ForgotPassword2Page } from "../../pages/forgot-password2/forgot-password2";
import { ProfilePage } from "../../pages/profile/profile";
import { IngredientPage } from "../../pages/ingredient/ingredient-page";
import { IngredientDetailsModal } from "../ingredient-details-modal/ingredient-details-modal";
import { useRef } from "react";
import { ProtectedRoute } from "../protected-route/protected-route";
import { Feed } from "../../pages/feed/feed";
import { OrderPage } from "../../pages/order-page/order-page";

export function AppRoutes() {
  const location = useLocation();
  const background = location.state && location.state.background;
  const dialogRef = useRef<HTMLDialogElement>(null);
  return (
    <>
      <Routes location={background || location}>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/register"
          element={
            <ProtectedRoute>
              <RegisterPage />
            </ProtectedRoute>
          }
        />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/forgot-password2" element={<ForgotPassword2Page />} />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        <Route path="/ingredient/:ingredientId" element={<IngredientPage />} />
        <Route path="/feed" element={<Feed />} />
        <Route path="/feed/:number" element={<OrderPage />} />
      </Routes>
      {background && (
        <Routes>
          <Route
            path="/ingredient/:ingredientId"
            element={
              <IngredientDetailsModal
                dialogRef={dialogRef}
              ></IngredientDetailsModal>
            }
          />
        </Routes>
      )}
    </>
  );
}
