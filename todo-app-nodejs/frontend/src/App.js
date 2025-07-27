import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route } from "react-router-dom";
import TodoPage from "./pages/TodoPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { PAGES } from "./const/routes";

function App() {
  return (
    <Routes>
      <Route path={PAGES.TODO} element={<TodoPage />} />
      <Route path={PAGES.LOGIN} element={<LoginPage />} />
      <Route path={PAGES.REGISTER} element={<RegisterPage />} />
    </Routes>
  );
}

export default App;
