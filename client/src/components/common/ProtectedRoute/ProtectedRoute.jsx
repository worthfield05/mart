import { useAuth } from "../../../hooks/useAuth";
import { Center, Spinner } from "@chakra-ui/react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ requireAuth = false }) => {
  const { data: user, isLoading } = useAuth();
  if (isLoading) {
    return (
      <Center minH={"60vh"}>
        <Spinner size={"xl"} />
      </Center>
    );
  }
  if (requireAuth && !user) {
    return <Navigate to="/login" replace />;
  }
  if (!requireAuth && user) {
    return <Navigate to={"/"} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
