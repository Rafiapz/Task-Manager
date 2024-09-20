import { ErrorMessage, Field, Form, Formik } from "formik";
import { FC } from "react";
import { taskSchema } from "../schema/taskSchema";
import { useEditTask } from "../hooks/useTaskHooks";

const ModalEditTask: FC<any> = ({ task, closeModal }) => {
   if (!task) return null;
   const taskInitialValues = {
      title: task?.title,
      description: task?.description,
   };

   const { mutate } = useEditTask(closeModal);

   const handleSubmit = (values: any) => {
      const formData = new FormData();
      formData.append("title", values?.title);
      formData.append("description", values?.description);
      formData.append("status", task?.status);
      const id = task?._id;
      mutate({ formData, id });
   };
   return (
      <div
         aria-hidden="true"
         className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden bg-black bg-opacity-50"
      >
         <div className="relative p-4 w-full max-w-md max-h-full">
            <div className="relative bg-white rounded-lg shadow border-2 border-blue-500 text-black">
               <div className="flex items-center justify-between p-4 md:p-5  rounded-t dark:border-gray-600">
                  <h3 className="text-xl font-bold text-gray-900">Edit Task</h3>
               </div>

               <div className="p-4 md:p-5">
                  <Formik initialValues={taskInitialValues} validationSchema={taskSchema} onSubmit={handleSubmit}>
                     <Form className="space-y-4">
                        <div>
                           <label htmlFor="email" className="block mb-2 text-gray-500 text-sm font-medium">
                              Title
                           </label>
                           <Field
                              name="title"
                              className="bg-transparent border-b-2 text-gray-900 text-sm focus:ring-0 focus:outline-none block w-full p-0"
                           />
                           <ErrorMessage name="title" component="div" className="text-red-500 text-sm" />
                        </div>

                        <div>
                           <label htmlFor="description" className="block mb-2 text-gray-500 text-sm font-medium">
                              Description
                           </label>
                           <Field
                              as="textarea"
                              name="description"
                              id="description"
                              className="bg-transparent border-b-2 text-gray-900 text-sm focus:ring-0 focus:outline-none block w-full p-0"
                           />
                           <ErrorMessage name="description" component="div" className="text-red-500 text-sm" />
                        </div>

                        <div className="flex justify-end space-x-2 pt-4">
                           <button
                              type="submit"
                              className="px-4 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
                           >
                              Submit
                           </button>
                           <button
                              type="button"
                              onClick={closeModal}
                              className="px-4 py-2 bg-gray-200 text-gray-900 rounded-lg hover:bg-gray-300 focus:ring-4 focus:outline-none focus:ring-gray-300"
                           >
                              Close
                           </button>
                        </div>
                     </Form>
                  </Formik>
               </div>
            </div>
         </div>
      </div>
   );
};

export default ModalEditTask;
