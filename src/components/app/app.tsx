import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HomePage } from "../../pages/home-page/home-page";
import { LoginPage } from "../../pages/login/login";
import { RegisterPage } from "../../pages/register/register";
import { ForgotPasswordPage } from "../../pages/forgot-password/forgot-password";
import { ForgotPassword2Page } from "../../pages/forgot-password2/forgot-password2";
import { ProfilePage } from "../../pages/profile/profile";

function App() {
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
