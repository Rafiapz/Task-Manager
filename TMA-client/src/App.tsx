import { Routes, Route } from "react-router-dom";
import "./App.css";
import LoginPage from "./pages/auth/LoginPage";
import SignupPage from "./pages/auth/SignupPage";
import HomePage from "./pages/user/HomePage";
import Layout from "./pages/layout/Layout";
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "./components/ProtectedRoute";
import { useUserFetch } from "./hooks/useUserHooks";
import { AuthProvider } from "./store/AuthProvider";
import PageNotFound from "./components/PageNotFound";

function App() {
   useUserFetch();

   return (
      <div>
         <AuthProvider>
            <Toaster position="top-center" containerClassName="text-red-500" />

            <Routes>
               <Route element={<Layout />}>
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/signup" element={<SignupPage />} />
               </Route>

               <Route element={<Layout />}>
                  <Route
                     path="/"
                     element={
                        <ProtectedRoute>
                           <HomePage />
                        </ProtectedRoute>
                     }
                  />
               </Route>
               <Route element={<Layout />}>
                  <Route path="*" element={<PageNotFound />} />
               </Route>
            </Routes>
         </AuthProvider>
      </div>
   );
}

export default App;
