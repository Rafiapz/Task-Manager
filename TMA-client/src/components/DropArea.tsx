import { useState } from "react";

const DropArea = ({ onDrop }: any) => {
   const [showDrop, setShowDrop] = useState(false);
   return (
      <>
         <section
            onDragEnter={() => setShowDrop(true)}
            onDragLeave={() => setShowDrop(false)}
            onDrop={() => {
               onDrop();
               setShowDrop(false);
            }}
            onDragOver={(e) => e.preventDefault()}
            className={`${
               showDrop
                  ? "w-full h-32 border rounded-sm p-4 mb-4 text-yellow-400  opacity-100 transition-all duration-200 ease-in-out "
                  : "opacity-0 text-yellow-200"
            }`}
         >
            Drop here
         </section>
      </>
   );
};

export default DropArea;
