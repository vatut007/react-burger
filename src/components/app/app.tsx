import styles from "./app.module.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HomePage } from "../../pages/home-page/home-page";
import { LoginPage } from "../../pages/login/login";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </Router>
  );
}
export default App;
