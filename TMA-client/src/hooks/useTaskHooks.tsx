import { useQuery } from "@tanstack/react-query";
import apiClient from "../utils/axios";
import { fetchTasks } from "../api/taskApi";

export const useTaskFetch = () => {
   return useQuery({
      queryKey: ["tasks"],
      queryFn: fetchTasks,
      refetchOnWindowFocus: false,
      retry: false,
   });
};

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
