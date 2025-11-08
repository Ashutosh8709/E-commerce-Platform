import React from "react";
import { useAdminData } from "../../../hooks/useAdminData";

function LowStocksList() {
  const { stats } = useAdminData();
  return (
    <ul className="divide-y divide-gray-100">
      {stats?.lowStockItems?.length &&
        stats?.lowStockItems?.map((item) => (
          <li
            key={item._id}
            className="flex justify-between items-center px-6 py-3 text-sm text-gray-700"
          >
            <div>
              <p className="font-medium">{item.name}</p>
              <p className="text-xs text-gray-500">
                Seller: {item.Seller?.storeName}
              </p>
            </div>
            <span className="font-semibold text-red-600">
              {item.stock} left
            </span>
          </li>
        ))}
    </ul>
  );
}

export default LowStocksList;
