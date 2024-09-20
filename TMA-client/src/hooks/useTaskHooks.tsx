import { QueryClient, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteTask, editTask, fetchTasks } from "../api/taskApi";
import toast from "react-hot-toast";

export const useTaskFetch = ({ sort, query }: any) => {
   console.log("ts cld");
   return useQuery({
      queryKey: ["tasks", sort, query],
      queryFn: () => fetchTasks({ sort, query }),
      refetchOnWindowFocus: false,
      retry: false,
   });
};

export const useDeleteTask = () => {
   const query: QueryClient = useQueryClient();
   return useMutation({
      mutationFn: deleteTask,
      onSuccess: () => {
         toast.success("Task deleted successfully");
         query.invalidateQueries({
            queryKey: ["tasks"],
         });
      },
      onError: (error: any) => {
         console.log(error);
         toast.error(error?.response?.data?.message);
      },
   });
};

export const useEditTask = (closeModal?: any) => {
   const query: QueryClient = useQueryClient();
   return useMutation({
      mutationFn: editTask,
      onSuccess: () => {
         toast.success("Task edited Successfully");
         query.invalidateQueries({
            queryKey: ["tasks"],
         });

         closeModal();
      },
      onError: (error: any) => {
         console.log(error);
         toast.error(error?.response?.data?.message);
      },
   });
};

export const useUpdateTaskStatus = () => {
   return useMutation({
      mutationFn: editTask,
      onSuccess: () => {},
      onError: (error: any) => {
         console.log(error);
         toast.error(error?.response?.data?.message);
      },
   });
};
