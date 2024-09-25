import React from "react";
import { Navigate } from "react-router-dom";
import { useUser } from "./UserContext";
import Spinner from "../components/ui/Spinner";

interface PrivateRouteProps {
  element: React.ReactNode;
  allowedRoles?: string[];
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({
  element,
  allowedRoles,
}) => {
  const { user, loading } = useUser();

  if (loading) {
    return (
      <Spinner message="Please wait while we check if you are allowed here!" />
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return <>{element}</>;
};

export default PrivateRoute;
