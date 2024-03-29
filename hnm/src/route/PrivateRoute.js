import React from "react";
import { Navigate } from "react-router-dom";
import ProductDetail from "../page/ProductDetail";

const PrivateRoute = ({ authenticate, setKeyword }) => {
  return authenticate ? (
    <ProductDetail setKeyword={setKeyword} />
  ) : (
    <Navigate to="/login" />
  );
};

export default PrivateRoute;
