import React from "react";
import TaskCard from "./TaskCard";
import DropArea from "./DropArea";

const TaskColumn = ({ status, setActiveCard, onDrop, task, handleEditModal, handleViewModal, handleDelete }: any) => {
   return (
      <div className="w-1/3 p-4 h-full border-2 flex flex-col gap-3">
         <div className="bg-blue-400 p-2 rounded-sm">
            <h1 className="text-white font-bold uppercase">{status}</h1>
         </div>
         <DropArea onDrop={() => onDrop(status, 0)} />
         <div className=" h-full rounded-sm flex flex-col gap-3">
            {task?.map(
               (task: any, index: number) =>
                  task?.status === status && (
                     <React.Fragment key={index}>
                        <TaskCard
                           task={task}
                           index={index}
                           handleEditModal={handleEditModal}
                           handleViewModal={handleViewModal}
                           setActiveCard={setActiveCard}
                           handleDelete={handleDelete}
                        />
                        <DropArea onDrop={() => onDrop(status, index + 1)} />
                     </React.Fragment>
                  )
            )}
         </div>
      </div>
   );
};

export default TaskColumn;
