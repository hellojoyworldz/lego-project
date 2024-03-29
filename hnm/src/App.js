import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./component/Navbar";
import ProductAll from "./page/ProductAll";
import Login from "./page/Login";
import PrivateRoute from "./route/PrivateRoute";

function App() {
  const [authenticate, setAuthenticate] = useState(false);
  const [cate, setCate] = useState("All");
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    //console.log(authenticate);
  }, [authenticate]);

  return (
    <div className="">
      <Navbar
        authenticate={authenticate}
        setAuthenticate={setAuthenticate}
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
          element={
            <Login
              setAuthenticate={setAuthenticate}
              setCate={setCate}
              setKeyword={setKeyword}
            />
          }
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
