import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
export const RequiresAuth = ({ children }) => {
  const { loggedIn } = useSelector((state) => state.auth);
  const location = useLocation();

  return loggedIn ? (
    children
  ) : (
    <Navigate to="/login" state={{ from: location }}></Navigate>
  );
};
