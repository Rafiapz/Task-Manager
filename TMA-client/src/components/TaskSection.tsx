import { FC, useRef } from "react";
import Draggable from "react-draggable";
import { useTaskFetch } from "../hooks/useTaskHooks";
import { QueryClient, useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTask } from "../api/taskApi";
import toast from "react-hot-toast";

const TaskSection: FC = () => {
   const nodeRef = useRef(null);
   const { data } = useTaskFetch();
   const query: QueryClient = useQueryClient();

   const { mutate } = useMutation({
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

   const handleDelete = (id: string) => {
      mutate(id);
   };
   return (
      <div className="flex gap-4 h-auto w-[1400px] overflow-hidden mt-5">
         <div className="w-1/3 p-4 h-full border-2 flex flex-col gap-3">
            <div className="bg-blue-400 p-2 rounded-sm">
               <h1 className="text-white font-bold">TODO</h1>
            </div>
            <div className=" h-full rounded-sm flex flex-col gap-3">
               {data?.data.map((task: any) => (
                  <div key={task?._id}>
                     <Draggable ref={nodeRef}>
                        <div ref={nodeRef} className="border-2 bg-blue-100 p-2">
                           <div className="flex flex-col gap-5">
                              <h1 className="text-xl font-bold">{task?.title}</h1>
                              <h2>{task?.description}</h2>
                              <h2>{task?.createdAt}</h2>
                           </div>
                           <div className="flex gap-5 justify-end mt-4">
                              <button onClick={() => handleDelete(task?._id)} className="bg-red-500 hover:bg-red-600 text-white px-2 h-7 rounded">
                                 Delete
                              </button>
                              <button className="bg-blue-400 hover:bg-blue-500 text-white  px-2 rounded">Edit</button>
                              <button className="bg-blue-500 hover:bg-blue-700 text-white  px-2 rounded">View Details</button>
                           </div>
                        </div>
                     </Draggable>
                  </div>
               ))}
            </div>
         </div>
         <div className="w-1/3 p-4 h-full border-2 ">
            <div className="bg-blue-400 p-2 rounded-sm">
               <h1 className="text-white font-bold">IN PROGRESS</h1>
            </div>
         </div>
         <div className="w-1/3 p-4  h-full border-2 ">
            <div className="bg-blue-400 p-2 rounded-sm">
               <h1 className="text-white font-bold">DONE</h1>
            </div>
         </div>
      </div>
   );
};

export default TaskSection;
