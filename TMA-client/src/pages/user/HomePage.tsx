import { useState } from "react";
import ModalAddTask from "../../components/ModalAddTask";
import Draggable from "react-draggable";
import TaskSection from "../../components/TaskSection";

const HomePage = () => {
   const [isModalOpen, setIsModalOpen] = useState(false);

   const toggleModal = () => {
      setIsModalOpen(!isModalOpen);
   };
   return (
      <div className=" pt-32 pl-16 pr-18 ">
         <div className="">
            <button onClick={toggleModal} className="bg-blue-500 hover:bg-blue-700 text-white  py-2 px-20 rounded-lg ">
               Add Task
            </button>
         </div>
         <ModalAddTask isModalOpen={isModalOpen} toggleModal={toggleModal} />
         <TaskSection />

         {/* <Draggable>
            <div className="border-2 border-blue-500 h-auto w-32">I can now be moved around!</div>
         </Draggable> */}
      </div>
   );
};

export default HomePage;
