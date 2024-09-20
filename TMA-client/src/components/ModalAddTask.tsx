import { ErrorMessage, Field, Form, Formik } from "formik";
import { FC } from "react";
import { taskSchema } from "../schema/taskSchema";
import { QueryClient, useMutation, useQueryClient } from "@tanstack/react-query";
import { addTask } from "../api/taskApi";
import toast from "react-hot-toast";

interface ITaskInitialValues {
   title: string;
   description: string;
}

const ModalAddTask: FC<any> = ({ isModalOpen, toggleModal }) => {
   const taskInitialValues: ITaskInitialValues = {
      title: "",
      description: "",
   };

   const query: QueryClient = useQueryClient();

   const { mutate } = useMutation({
      mutationFn: addTask,
      onSuccess: () => {
         toast.success("Task added successfully");
         query.invalidateQueries({
            queryKey: ["tasks"],
         });
         toggleModal();
      },
      onError: (error: any) => {
         toast.error(error?.response?.data?.message);
      },
   });

   const handleSubmit = (values: ITaskInitialValues) => {
      const formData = new FormData();
      formData.append("title", values?.title);
      formData.append("description", values?.description);
      formData.append("status", "todo");
      mutate(formData);
   };
   return (
      <>
         {isModalOpen && (
            <div aria-hidden="true" className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden">
               <div className="relative p-4 w-full max-w-md max-h-full">
                  <div className="relative bg-white rounded-lg shadow border-2 border-blue-500 text-black">
                     <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                        <h3 className="text-xl font-semibold text-gray-900 ">Add Task</h3>
                        <button
                           type="button"
                           onClick={toggleModal}
                           className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                           <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                              <path
                                 stroke="currentColor"
                                 strokeLinecap="round"
                                 strokeLinejoin="round"
                                 strokeWidth="2"
                                 d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                              />
                           </svg>
                           <span className="sr-only">Close modal</span>
                        </button>
                     </div>

                     <div className="p-4 md:p-5">
                        <Formik initialValues={taskInitialValues} validationSchema={taskSchema} onSubmit={handleSubmit}>
                           <Form className="space-y-4">
                              <div>
                                 <label htmlFor="email" className="block mb-2 text-sm font-medium">
                                    Title
                                 </label>
                                 <Field
                                    name="title"
                                    className="bg-gray-50 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 border-2"
                                 />
                                 <ErrorMessage name="title" component="div" className="text-red-500 text-sm" />
                              </div>

                              <div>
                                 <label htmlFor="description" className="block mb-2 text-sm font-medium">
                                    Description
                                 </label>
                                 <Field
                                    as="textarea"
                                    name="description"
                                    id="description"
                                    className="bg-gray-50 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 border-2"
                                 />
                                 <ErrorMessage name="description" component="div" className="text-red-500 text-sm" />
                              </div>

                              <button
                                 type="submit"
                                 className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                              >
                                 Submit
                              </button>
                           </Form>
                        </Formik>
                     </div>
                  </div>
               </div>
            </div>
         )}
      </>
   );
};

export default ModalAddTask;
