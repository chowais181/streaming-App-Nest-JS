import { Navigate } from "react-router-dom";

const ProtectedRoute = (props) => {
  // if (!localStorage.getItem("userToken")) {
  //   return <Navigate to="/" />;
  // }
  // return the rest of the code here
  return props.children;
};

export default ProtectedRoute;
