import React from "react";
import { AiOutlineSearch } from "react-icons/ai";
const filterbar = ({ filterPhrase, setFilterPhrase }) => {
  return (
    <div className="flex row content-center">
      <div className="flex bg-slate-300 w-72 transition-colors">
        <div className="flex items-center">
          <AiOutlineSearch className="w-5 h-5 mx-2 text-slate-700" />
        </div>
        <input
          type="search"
          placeholder="Filter Scooters"
          value={filterPhrase}
          onChange={(e) => {
            setFilterPhrase(e.target.value);
          }}
          className="
                w-full text-gray-700 text-sm bg-slate-300
                p-1 placeholder-gray-700 focus:outline-none focus:border-blue-500"
        />
      </div>
    </div>
  );
};

export default filterbar;
