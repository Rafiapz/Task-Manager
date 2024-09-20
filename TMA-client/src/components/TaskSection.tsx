import { FC, useEffect, useState } from "react";
import { useDeleteTask, useTaskFetch, useUpdateTaskStatus } from "../hooks/useTaskHooks";
import ModalEditTask from "./ModalEditTask";
import ModalViewDetails from "./ModalViewDetails";
import TaskColumn from "./TaskColumn";

const TaskSection: FC<any> = ({ sort, query }) => {
   const [selectedTask, setSelectedTask] = useState<any>();
   const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
   const [isViewModalOpen, setIsViewModalOpen] = useState<boolean>(false);
   const [activeCard, setActiveCard] = useState<any>(null);

   const [task, setTask] = useState<any>(null);

   const { data } = useTaskFetch({ sort, query });

   useEffect(() => {
      if (data) {
         setTask(data?.data);
      }
   }, [data]);

   const { mutate } = useDeleteTask();
   const handleDelete = (id: string) => {
      mutate(id);
   };
   const handleEditModal = (task: any) => {
      setIsModalOpen(true);
      setSelectedTask(task);
   };
   const closeModal = () => {
      setIsModalOpen(false);
      setIsViewModalOpen(false);
   };
   const handleViewModal = (task: any) => {
      setIsViewModalOpen(true);
      setSelectedTask(task);
   };

   const { mutate: editStatus } = useUpdateTaskStatus();

   const onDrop = (status: string, position: number) => {
      console.log(`${activeCard} is going to place into ${status} and at the position ${position}`);
      if (activeCard === null || activeCard === undefined) return;
      const task = data?.data;
      const taskToMove = task?.find((ob: any) => ob?._id === activeCard);
      const updatedTasks = task.filter((task: any) => task?._id !== activeCard);

      console.log(taskToMove, "task to move");
      console.log(position);
      taskToMove.status = status;
      updatedTasks.splice(position, 0, taskToMove);
      console.log(updatedTasks, "updated");

      setTask(updatedTasks);
      const formData = new FormData();
      const id = taskToMove?._id;
      formData.append("status", status);
      editStatus({ formData, id });
   };
   return (
      <div className="flex gap-4 h-auto w-[1400px] overflow-hidden mt-5">
         {isModalOpen && <ModalEditTask task={selectedTask} closeModal={closeModal} />}
         {isViewModalOpen && <ModalViewDetails task={selectedTask} closeModal={closeModal} />}
         <TaskColumn
            status="todo"
            task={task}
            setActiveCard={setActiveCard}
            onDrop={onDrop}
            handleEditModal={handleEditModal}
            handleViewModal={handleViewModal}
            handleDelete={handleDelete}
         />
         <TaskColumn
            status="in progress"
            task={task}
            setActiveCard={setActiveCard}
            onDrop={onDrop}
            handleEditModal={handleEditModal}
            handleViewModal={handleViewModal}
            handleDelete={handleDelete}
         />
         <TaskColumn
            status="done"
            task={task}
            setActiveCard={setActiveCard}
            onDrop={onDrop}
            handleEditModal={handleEditModal}
            handleViewModal={handleViewModal}
            handleDelete={handleDelete}
         />
      </div>
   );
};

export default TaskSection;
