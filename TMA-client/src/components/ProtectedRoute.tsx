import { Navigate } from "react-router-dom";
import { QueryClient, useQueryClient } from "@tanstack/react-query";

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
   const query: QueryClient = useQueryClient();
   const userData: any = query.getQueryData(["auth"]);

   if (!userData?.isAuthenticated) {
      return <Navigate to="/login" replace />;
   }

   return <>{children}</>;
};

export default ProtectedRoute;
