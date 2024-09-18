import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileAlt } from "@fortawesome/free-solid-svg-icons";
import { FC } from "react";
import { Link, useLocation } from "react-router-dom";

const Header: FC = () => {
   const location = useLocation().pathname;

   return (
      <div className="bg-blue-600 h-[60px] p-2 w-full flex z-10 top-0 left-0 fixed">
         <div className=" w-1/2 mt-2">
            <div className="">
               <FontAwesomeIcon icon={faFileAlt} className="text-white h-6" />
            </div>
         </div>
         <div className=" w-1/2 flex justify-end ">
            <div className="w-48  flex gap-4 justify-center items-center">
               <div
                  className={`${
                     location === "/login" ? "bg-white text-blue-600 hover:bg-slate-100" : "bg-blue-600 text-white hover:bg-blue-500"
                  } h-8  e font-bold py-1 px-4 rounded cursor-pointer`}
               >
                  <Link to={"/login"}>Login</Link>
               </div>

               <div
                  className={`${
                     location === "/signup" ? "bg-white text-blue-600" : "bg-blue-600 text-white hover:bg-blue-500"
                  } h-8  e font-bold pt-1 px-4 rounded cursor-pointer`}
               >
                  <Link to={"/signup"}>Signup</Link>
               </div>
            </div>
         </div>
      </div>
   );
};

export default Header;
