import styles from "./app.module.css";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HomePage } from "../../pages/home-page/home-page";

function App() {
  return(
    <Router>
    <Routes>
      <Route path="/" element={<HomePage />} />
    </Routes>
  </Router>
  )
}
export default App;
