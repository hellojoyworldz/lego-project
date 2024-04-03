import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./component/Navbar";
import ProductAll from "./page/ProductAll";
import Login from "./page/Login";
import PrivateRoute from "./route/PrivateRoute";
import { useSelector } from "react-redux";

function App() {
  const authenticate = useSelector((state) => state.auth.authenticate);
  const [cate, setCate] = useState("All");
  const [keyword, setKeyword] = useState("");

  return (
    <div className="">
      <Navbar
        authenticate={authenticate}
        cate={cate}
        setCate={setCate}
        keyword={keyword}
        setKeyword={setKeyword}
      />
      <Routes>
        <Route
          path="/"
          element={<ProductAll cate={cate} setCate={setCate} />}
        />
        <Route
          path="/login"
          element={<Login setCate={setCate} setKeyword={setKeyword} />}
        />
        <Route
          path="/product/:id"
          element={
            <PrivateRoute authenticate={authenticate} setKeyword={setKeyword} />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
