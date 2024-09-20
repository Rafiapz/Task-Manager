import React from "react";

const SearchAndSort: React.FC<any> = ({ sort, setSort, query, setQuery }) => {
   const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
      setQuery(event.target.value);
      console.log(query);
   };

   const handleSort = (event: React.ChangeEvent<HTMLSelectElement>) => {
      setSort(event.target.value);
   };

   return (
      <div className="flex justify-between items-center w-[1400px] border-2 mt-5 bg-white p-4 shadow-md rounded-lg">
         <div className="w-1/3">
            <div className="flex items-center space-x-2">
               <label htmlFor="search" className="text-gray-700 font-medium">
                  Search
               </label>
               <input
                  id="search"
                  type="text"
                  value={query}
                  onChange={handleSearch}
                  placeholder="Search..."
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
               />
            </div>
         </div>

         <div className="w-1/4 flex justify-end">
            <div className="flex items-center space-x-2">
               <label htmlFor="sort" className="text-gray-700 font-medium">
                  Sort By
               </label>
               <select
                  id="sort"
                  value={sort}
                  onChange={handleSort}
                  className="w-44 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
               >
                  <option value="-1">Recent</option>
                  <option value="1">Oldest</option>
               </select>
            </div>
         </div>
      </div>
   );
};

export default SearchAndSort;
