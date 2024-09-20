import { createContext, FC, useContext, useState } from "react";

const AuthContext = createContext<any>(null);

export const AuthProvider: FC<any> = ({ children }) => {
   const [isAuthenticated, setIsAuthenticated] = useState(null);

   return <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
