import React from "react";
import { AiOutlineSearch } from "react-icons/ai";

const Search = ({ handleSearch, searchPhrase, setSearchPhrase }) => {
  return (
    <div className="flex row content-center p-4">
      <div className="flex rounded-xl bg-orange-500 hover:bg-orange-600 w-96">
        <button onClick={handleSearch} className="flex items-center">
          <AiOutlineSearch className="w-5 h-5 mx-2 text-white" />
        </button>
        <input
          type="search"
          placeholder="Search Location"
          value={searchPhrase}
          onChange={(e) => {
            setSearchPhrase(e.target.value);
          }}
          className="
            w-full text-gray-700 text-sm rounded-r-xl bg-slate-300
            p-3 placeholder-gray-700 focus:outline-none focus:border-blue-500"
        />
      </div>
    </div>
  );
};

export default Search;
