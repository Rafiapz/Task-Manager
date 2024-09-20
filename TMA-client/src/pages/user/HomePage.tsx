import { useState } from "react";
import ModalAddTask from "../../components/ModalAddTask";
import TaskSection from "../../components/TaskSection";
import ModalEditTask from "../../components/ModalEditTask";
import SearchAndSort from "../../components/SearchAndSort";

const HomePage = () => {
   const [isAddModalOpen, setIsAddModalOpen] = useState(false);
   const [sort, setSort] = useState<number>(-1);
   const [query, setQuery] = useState<string | null>(null);
   const toggleAddModal = () => {
      setIsAddModalOpen(!isAddModalOpen);
   };

   return (
      <div className=" pt-32 pl-16 pr-18 ">
         <div className="">
            <button onClick={toggleAddModal} className="bg-blue-500 hover:bg-blue-700 text-white  py-2 px-20 rounded-lg ">
               Add Task
            </button>
         </div>
         <SearchAndSort sort={sort} setSort={setSort} query={query} setQuery={setQuery} />
         <ModalAddTask isModalOpen={isAddModalOpen} toggleModal={toggleAddModal} />
         <ModalEditTask />
         <TaskSection sort={sort} query={query} setSort={setSort} />
      </div>
   );
};

export default HomePage;
