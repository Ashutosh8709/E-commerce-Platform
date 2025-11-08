import React from "react";
import { ShoppingCart } from "lucide-react";

function OrdersPage() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
        <ShoppingCart size={20} /> All Orders
      </h2>
      <p className="text-gray-500 mb-4">📦 Manage and track customer orders.</p>
      <div className="flex justify-center items-center h-48 text-gray-400">
        [Orders Management Table]
      </div>
    </div>
  );
}

export default OrdersPage;
