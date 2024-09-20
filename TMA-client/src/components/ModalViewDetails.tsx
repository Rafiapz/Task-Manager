const ModalViewDetails = ({ task, closeModal }: any) => {
   if (!task) return null;
   return (
      <div
         aria-hidden="true"
         className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden bg-black bg-opacity-50"
      >
         <div className="relative p-4 w-full max-w-md max-h-full">
            <div className="relative bg-white rounded-lg shadow border-2 border-blue-500 text-black">
               <div className="flex items-center justify-between p-4 md:p-5  rounded-t dark:border-gray-600">
                  <h3 className="text-xl font-bold text-gray-900">Task Details</h3>
               </div>

               <div className="p-4 md:p-5 flex flex-col gap-5">
                  <div>
                     <label htmlFor="email" className="block mb-2 text-gray-500 text-sm font-medium">
                        Title
                     </label>
                     <h1 className="bg-transparent border-b-2 text-gray-900 text-sm focus:ring-0 focus:outline-none block w-full p-0">
                        {task?.title}
                     </h1>
                  </div>

                  <div>
                     <label htmlFor="description" className="block mb-2 text-gray-500 text-sm font-medium">
                        Description
                     </label>
                     <h1 className="bg-transparent border-b-2 text-gray-900 text-sm focus:ring-0 focus:outline-none block w-full p-0">
                        {task?.description}
                     </h1>
                  </div>

                  <div className="flex justify-end space-x-2 pt-4">
                     <button
                        type="button"
                        onClick={closeModal}
                        className="px-4 py-2 bg-gray-200 text-gray-900 rounded-lg hover:bg-gray-300 focus:ring-4 focus:outline-none focus:ring-gray-300"
                     >
                        Close
                     </button>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default ModalViewDetails;
