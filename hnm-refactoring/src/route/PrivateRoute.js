import React from "react";
import { Navigate } from "react-router-dom";
import ProductDetail from "../page/ProductDetail";
import { useSelector } from "react-redux";

const PrivateRoute = ({ setKeyword }) => {
  const authenticate = useSelector((state) => state.auth.authenticate);
  return authenticate ? (
    <ProductDetail setKeyword={setKeyword} />
  ) : (
    <Navigate to="/login" />
  );
};

export default PrivateRoute;
