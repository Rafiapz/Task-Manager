import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { GoogleOAuthProvider } from "@react-oauth/google";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
   <StrictMode>
      <BrowserRouter>
         <QueryClientProvider client={queryClient}>
            <ReactQueryDevtools initialIsOpen={false} />
            <GoogleOAuthProvider clientId="629313093824-f01qoc2j1dd02vv8h2haplpd2hdhh8c5.apps.googleusercontent.com">
               <App />
            </GoogleOAuthProvider>
         </QueryClientProvider>
      </BrowserRouter>
   </StrictMode>
);
