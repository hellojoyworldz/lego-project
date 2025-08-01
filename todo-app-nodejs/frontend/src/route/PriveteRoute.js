import React from "react";
import { Navigate } from "react-router-dom";
import { PAGES } from "../const/routes";

const PriveteRoute = ({ user, children }) => {
  return user ? children : <Navigate to={PAGES.LOGIN} />;
};

export default PriveteRoute;
