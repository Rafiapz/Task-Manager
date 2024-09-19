import { FC } from "react";

import { Navigate, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import apiClient from "../utils/axios";
import { useUserFetch } from "../hooks/useUserHooks";

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
   const { data, isLoading, isError } = useUserFetch();

   if (isLoading) {
      return <div>Loading...</div>;
   }

   if (isError) {
      return <Navigate to="/login" replace />;
   }

   if (!data?.isAuthenticated) {
      return <Navigate to="/login" replace />;
   }

   return <>{children}</>;
};

export default ProtectedRoute;
