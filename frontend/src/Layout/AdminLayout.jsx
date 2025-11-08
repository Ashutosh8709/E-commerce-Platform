import AdminNavbar from "../components/Navbar/AdminNavbar";
import AdminSidebar from "../components/SideBar/AdminSidebar";
import { useState } from "react";
import { Outlet, useParams } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";

export default function AdminLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { tab } = useParams();
  const [activeTab, setActiveTab] = useState(tab);

  useEffect(() => {
    setActiveTab(tab);
  }, [tab]);

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.aside
            initial={{ x: -260, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -260, opacity: 0 }}
            transition={{ type: "tween", duration: 0.3 }}
            className="w-64 bg-white border-r border-gray-200 flex flex-col fixed top-0 left-0 h-full z-40 shadow-md"
          >
            <AdminSidebar
              setIsSidebarOpen={setIsSidebarOpen}
              isSidebarOpen={isSidebarOpen}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
          </motion.aside>
        )}
      </AnimatePresence>

      <div className="flex flex-col flex-1">
        <AdminNavbar setIsSidebarOpen={setIsSidebarOpen} />
        <main
          className={`flex-5 transition-all px-8 duration-300 ${
            isSidebarOpen ? "ml-64" : "ml-0"
          }`}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
}
