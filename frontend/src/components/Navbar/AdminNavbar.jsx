import React from "react";
import { Menu } from "lucide-react";

function AdminNavbar({ setIsSidebarOpen }) {
  return (
    <>
      <div className="flex flex-col flex-1">
        <header className="flex items-center justify-between bg-white shadow-sm px-6 py-4  sticky top-0 z-30">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 bg-indigo-600 text-white rounded-lg shadow-sm hover:bg-indigo-700 transition cursor-pointer"
          >
            <Menu size={20} />
          </button>
          <h1 className="text-lg font-semibold text-gray-800">Admin Panel</h1>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-indigo-200 flex items-center justify-center font-bold text-indigo-700">
              A
            </div>
          </div>
        </header>
      </div>
    </>
  );
}

export default AdminNavbar;
