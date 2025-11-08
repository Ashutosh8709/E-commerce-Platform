import { LayoutGrid, Package, ShoppingCart, BarChart3, X } from "lucide-react";
import { Link } from "react-router-dom";

export default function AdminSidebar({
  isSidebarOpen = true,
  setIsSidebarOpen,
  setActiveTab,
  activeTab,
}) {
  return (
    <>
      {isSidebarOpen && (
        <div className="w-64 bg-white border-r border-gray-200 flex flex-col fixed top-0 left-0 h-full z-40 shadow-md">
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
            <h1 className="text-2xl font-bold text-indigo-600">Admin Panel</h1>
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition cursor-pointer"
            >
              <X size={22} strokeWidth={2.5} />
            </button>
          </div>

          <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
            {[
              { name: "Dashboard", icon: LayoutGrid },
              { name: "Analytics", icon: BarChart3 },
              { name: "Orders", icon: ShoppingCart },
              { name: "Products", icon: Package },
            ].map((item) => (
              <Link
                to={`/admin/${item.name.toLowerCase()}`}
                key={item.name}
                onClick={() => setActiveTab(item.name.toLowerCase())}
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === item.name.toLowerCase()
                    ? "bg-indigo-50 text-indigo-600"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <item.icon size={20} />
                <span>{item.name}</span>
              </Link>
            ))}
          </nav>
        </div>
      )}
    </>
  );
}
