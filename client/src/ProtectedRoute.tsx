import { ReactNode } from "react";
import { RootState } from "./store/appStore";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

interface ProtectedRouteProps {
  children?: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {

  const token = useSelector((state:RootState) => state.auth.token)
  const isAuthenticated: boolean = token ? true : false; 

  if (!isAuthenticated) {
    return <Navigate to={"/"} replace/>;
  }

  return children ? children : <Outlet />;
};

export default ProtectedRoute;