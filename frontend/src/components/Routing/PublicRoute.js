import React from "react";
import { Navigate } from "react-router-dom";

function PublicRoute(props) {
  // if (localStorage.getItem("userToken")) {
  //   console.log(localStorage.getItem("userToken"));
  //   return <Navigate to="/video" />;
  // }
  return props.children;
}

export default PublicRoute;
