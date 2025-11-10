import { Menu } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

function AdminNavbar({ setIsSidebarOpen }) {
  const { logout } = useAuth();
  const handleLogout = async () => {
    await logout();
  };
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
            <button
              onClick={handleLogout}
              className="flex items-center justify-center text-red-700 cursor-pointer"
            >
              logout
            </button>
          </div>
        </header>
      </div>
    </>
  );
}

export default AdminNavbar;
