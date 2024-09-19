import { useMutation, useQuery } from "@tanstack/react-query";
import apiClient from "../utils/axios";
import { jsonConfig } from "../utils/apiUtils";

export const useUserFetch = () => {
   return useQuery({
      queryKey: ["auth"],
      queryFn: async () => {
         const response = await apiClient.get("/user/fetch-user");
         return response?.data;
      },
      refetchOnWindowFocus: false,
      retry: false,
   });
};

export const useUserSignupMutate = () => {
   return useMutation({
      mutationFn: async (form: any) => {
         await apiClient.post("http://localhost:3500/user/signup", form, jsonConfig);
      },
   });
};
