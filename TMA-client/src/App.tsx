import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import LoginPage from "./pages/auth/LoginPage";
import SignupPage from "./pages/auth/SignupPage";
import HomePage from "./pages/user/HomePage";
import Layout from "./pages/layout/Layout";

function App() {
   return (
      <>
         <Routes>
            <Route path="/" element={<Layout />}>
               <Route index element={<HomePage />} />
               <Route path="/login" element={<LoginPage />} />
               <Route path="/signup" element={<SignupPage />} />
            </Route>
         </Routes>
      </>
   );
}

export default App;
