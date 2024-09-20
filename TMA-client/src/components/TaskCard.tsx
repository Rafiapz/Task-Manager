const TaskCard = ({ task, handleDelete, handleEditModal, handleViewModal, setActiveCard }: any) => {
   return (
      <div key={task?._id} draggable onDragStart={() => setActiveCard(task?._id)} onDragEnd={() => setActiveCard(null)}>
         <div className="border-2 bg-blue-100 p-2 rounded-lg">
            <div className="flex flex-col gap-5">
               <h1 className="text-xl font-bold">{task?.title}</h1>
               <h2 className="text-gray-600">{task?.description}</h2>
               <h2 className="text-gray-600">Created at: {new Date(task?.createdAt).toLocaleString()}</h2>
            </div>
            <div className="flex gap-5 justify-end mt-4">
               <button onClick={() => handleDelete(task?._id)} className="bg-red-500 hover:bg-red-600 text-white px-2 h-7 rounded">
                  Delete
               </button>
               <button onClick={() => handleEditModal(task)} className="bg-blue-400 hover:bg-blue-500 text-white  px-2 rounded">
                  Edit
               </button>
               <button onClick={() => handleViewModal(task)} className="bg-blue-500 hover:bg-blue-700 text-white  px-2 rounded">
                  View Details
               </button>
            </div>
         </div>
      </div>
   );
};

export default TaskCard;
