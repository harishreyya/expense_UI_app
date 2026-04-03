import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useRole } from "../../context/RoleContext";
import { useTheme } from "../../context/ThemeContext";

function Header() {
  const { role, setRole } = useRole();
  const { dark, setDark } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header
      className="
        sticky top-0 z-50 
        bg-white/70 dark:bg-gray-900/70 
        backdrop-blur-lg 
        border-b border-gray-200 dark:border-gray-700
      "
    >

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">

        <div className="flex items-center gap-4">

          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold shadow-lg">
            ₹
          </div>

          <div className="hidden md:flex items-center gap-6 text-sm font-medium">
            
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "text-indigo-600 dark:text-indigo-400"
                  : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
              }
            >
              Dashboard
            </NavLink>

            <NavLink
              to="/transactions"
              className={({ isActive }) =>
                isActive
                  ? "text-indigo-600 dark:text-indigo-400"
                  : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
              }
            >
              Transactions
            </NavLink>

            <NavLink
              to="/insights"
              className={({ isActive }) =>
                isActive
                  ? "text-indigo-600 dark:text-indigo-400"
                  : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
              }
            >
              Insights
            </NavLink>

            <button
              onClick={() => setDark(!dark)}
              className="
                px-3 py-1 rounded-lg 
                bg-gray-100 dark:bg-gray-800 
                text-gray-700 dark:text-gray-200
                hover:scale-105 transition
              "
            >
              {dark ? "🌙" : "☀️"}
            </button>

          </div>
        </div>

        <div className="flex items-center gap-3 sm:gap-4">

          <div className="hidden sm:flex items-center bg-gray-100 dark:bg-gray-800 rounded-xl p-1">
            <button
              onClick={() => setRole("viewer")}
              className={`px-2 sm:px-3 py-1 text-xs sm:text-sm rounded-lg transition ${
                role === "viewer"
                  ? "bg-white dark:bg-gray-700 shadow text-gray-800 dark:text-gray-100"
                  : "text-gray-500 dark:text-gray-400"
              }`}
            >
              Viewer
            </button>

            <button
              onClick={() => setRole("admin")}
              className={`px-2 sm:px-3 py-1 text-xs sm:text-sm rounded-lg transition ${
                role === "admin"
                  ? "bg-white dark:bg-gray-700 shadow text-gray-800 dark:text-gray-100"
                  : "text-gray-500 dark:text-gray-400"
              }`}
            >
              Admin
            </button>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center text-sm font-semibold text-white shadow-sm">
              U
            </div>

            <div className="hidden lg:block text-sm">
              <p className="font-medium text-gray-700 dark:text-gray-200">
                User
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Welcome back
              </p>
            </div>
          </div>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="
              md:hidden p-2 rounded-lg 
              hover:bg-gray-100 dark:hover:bg-gray-800
              text-gray-700 dark:text-gray-200
            "
          >
            ☰
          </button>

        </div>
      </div>

      {menuOpen && (
        <div
          className="
            md:hidden px-4 pb-4 space-y-3 
            border-t border-gray-100 dark:border-gray-700 
            bg-white dark:bg-gray-900
          "
        >

          <NavLink
            to="/"
            onClick={() => setMenuOpen(false)}
            className="block text-sm text-gray-600 dark:text-gray-300 hover:text-indigo-600"
          >
            Dashboard
          </NavLink>

          <NavLink
            to="/transactions"
            onClick={() => setMenuOpen(false)}
            className="block text-sm text-gray-600 dark:text-gray-300 hover:text-indigo-600"
          >
            Transactions
          </NavLink>

          <NavLink
            to="/insights"
            onClick={() => setMenuOpen(false)}
            className="block text-sm text-gray-600 dark:text-gray-300 hover:text-indigo-600"
          >
            Insights
          </NavLink>

          <button
            onClick={() => setDark(!dark)}
            className="
              px-3 py-1 rounded-lg 
              bg-gray-100 dark:bg-gray-800 
              text-gray-700 dark:text-gray-200
            "
          >
            {dark ? "🌙" : "☀️"}
          </button>

          <div className="flex gap-2 pt-2">
            
            <button
              onClick={() => setRole("viewer")}
              className={`flex-1 py-2 text-sm rounded-lg ${
                role === "viewer"
                  ? "bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400"
                  : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300"
              }`}
            >
              Viewer
            </button>

            <button
              onClick={() => setRole("admin")}
              className={`flex-1 py-2 text-sm rounded-lg ${
                role === "admin"
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300"
              }`}
            >
              Admin
            </button>
          </div>

        </div>
      )}
      
    </header>
  );
}

export default Header;