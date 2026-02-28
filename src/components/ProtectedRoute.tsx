import { Navigate } from "react-router-dom";
import { useUserStore } from "../stores/useUserStore";
import type React from "react";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { currentUser, _hasHydrated } = useUserStore();
  if (!_hasHydrated) return <>Loading...</>;
  if (!currentUser) return <Navigate to={"/"} replace />;
  return <>{children}</>;
};

export default ProtectedRoute;
