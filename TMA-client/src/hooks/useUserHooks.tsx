import { QueryClient, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import apiClient from "../utils/axios";
import { jsonConfig } from "../utils/apiUtils";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/AuthProvider";

export const useUserFetch = () => {
   const navigate = useNavigate();
   const dd = useAuth();
   console.log(dd);
   return useQuery({
      queryKey: ["auth"],
      queryFn: async () => {
         const response = await apiClient.get("/user/fetch-user");
         if (response?.data?.isAuthenticated) {
            // setIsAuthenticated(true);
            navigate("/");
         }
         return response?.data;
      },
      refetchOnWindowFocus: false,
      retry: false,
   });
};

export const useUserSignupMutate = () => {
   const { setIsAuthenticated } = useAuth();
   return useMutation({
      mutationFn: async (form: any) => {
         await apiClient.post("http://localhost:3500/user/signup", form, jsonConfig);
      },
      onSuccess: () => {
         setIsAuthenticated(true);
      },
      onError: (error: any) => {
         toast.error(error?.response?.data?.message || "Network Error");
      },
   });
};

export const useUserLogin = () => {
   const query: QueryClient = useQueryClient();
   const navigate = useNavigate();
   const { setIsAuthenticated } = useAuth();
   return useMutation({
      mutationFn: async (formData: FormData) => {
         return (await apiClient.post("/user/login", formData, jsonConfig)).data;
      },
      onSuccess: (data) => {
         query.invalidateQueries({
            queryKey: ["auth"],
         });
         query.removeQueries();
         setIsAuthenticated(true);
         if (data.status == "success") {
            navigate("/");
         }
      },
      onError: (error: any) => {
         console.log(error);
         toast.error(error?.response?.data?.message || "Network Error");
      },
   });
};

export const useLoginWithGoogle = () => {
   const query: QueryClient = useQueryClient();
   const { setIsAuthenticated } = useAuth();
   const navigate = useNavigate();
   return useMutation({
      mutationFn: async (accessToken) => {
         return (await apiClient.post("/user/login-with-google", { googleAccesToken: accessToken }, jsonConfig)).data;
      },
      onSuccess: (data) => {
         query.invalidateQueries({
            queryKey: ["auth"],
         });
         query.removeQueries();
         if (data.status == "success") {
            setIsAuthenticated(true);
            navigate("/");
         }
      },
      onError: (error: any) => {
         console.log(error);
         toast.error(error?.response?.data?.message || "Network Error");
      },
   });
};
