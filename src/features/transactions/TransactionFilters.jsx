import { useState, useEffect } from "react";

function TransactionFilters({ onFilter }) {
  const [search, setSearch] = useState("");
  const [type, setType] = useState("all");
  const [sort, setSort] = useState("latest");

  useEffect(() => {
    onFilter({ search, type, sort });
  }, [search, type, sort]);

  const resetFilters = () => {
    setSearch("");
    setType("all");
    setSort("latest");
  };

  return (
    <div
      className="
        bg-white dark:bg-gray-900
        p-5 rounded-2xl shadow-sm 
        border border-gray-100 dark:border-gray-700
        space-y-4
      "
    >
      
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

        <div className="relative w-full md:w-1/3">
          <input
            type="text"
            placeholder="Search by category..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="
              w-full pl-10 pr-3 py-2 rounded-xl 
              border border-gray-200 dark:border-gray-700
              bg-white dark:bg-gray-800
              text-gray-800 dark:text-gray-100
              placeholder-gray-400 dark:placeholder-gray-500
              text-sm 
              focus:ring-2 focus:ring-indigo-500 
              outline-none transition
            "
          />
          <span className="absolute left-3 top-2.5 text-gray-400 dark:text-gray-500 text-sm">
            🔍
          </span>
        </div>

        <button
          onClick={resetFilters}
          className="
            text-sm 
            text-gray-500 dark:text-gray-400 
            hover:text-red-500 dark:hover:text-red-400 
            transition
          "
        >
          Reset Filters
        </button>
      </div>

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        
        <div className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-xl p-1">
          
          {["all", "income", "expense"].map((item) => (
            <button
              key={item}
              onClick={() => setType(item)}
              className={`px-4 py-1.5 text-sm rounded-lg transition ${
                type === item
                  ? "bg-white dark:bg-gray-700 shadow text-gray-800 dark:text-gray-100"
                  : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
              }`}
            >
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Sort by:
          </span>
          
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="
              border border-gray-200 dark:border-gray-700
              bg-white dark:bg-gray-800
              text-gray-800 dark:text-gray-100
              rounded-xl px-3 py-2 text-sm 
              focus:ring-2 focus:ring-indigo-500 
              outline-none
            "
          >
            <option value="latest">Latest</option>
            <option value="oldest">Oldest</option>
            <option value="high">Amount ↑</option>
            <option value="low">Amount ↓</option>
          </select>
        </div>

      </div>
    </div>
  );
}

export default TransactionFilters;