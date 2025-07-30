import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route } from "react-router-dom";
import TodoPage from "./pages/TodoPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { PAGES } from "./const/routes";
import { useState } from "react";
import PrivateRoute from "./route/PriveteRoute";
import { useEffect } from "react";
import { ENDPOINTS } from "./const/endpoints";
import api from "./utils/api";

function App() {
  const [user, setUser] = useState(null);
  const getUser = async () => {
    try {
      const storedToken = sessionStorage.getItem("token");
      if (storedToken) {
        const response = await api(ENDPOINTS.ME);
        setUser(response.data.user);
      }
    } catch (error) {}
  };

  useEffect(() => {
    getUser();
  }, [user]);

  return (
    <Routes>
      <Route
        path={PAGES.TODO}
        element={
          <PrivateRoute user={user}>
            <TodoPage />
          </PrivateRoute>
        }
      />
      <Route
        path={PAGES.LOGIN}
        element={<LoginPage user={user} setUser={setUser} />}
      />
      <Route path={PAGES.REGISTER} element={<RegisterPage />} />
    </Routes>
  );
}

export default App;
