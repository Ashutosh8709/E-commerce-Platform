import React from "react";
import { useAdminData } from "../../../hooks/useAdminData";
import moment from "moment";

function RecentOrdersTable() {
  const { orders } = useAdminData();

  return (
    <table className="w-full">
      <thead className="bg-gray-50 text-gray-600 text-xs uppercase font-medium">
        <tr>
          <th className="text-left px-6 py-3">Order ID</th>
          <th className="text-left px-6 py-3">Date</th>
          <th className="text-left px-6 py-3">Status</th>
          <th className="text-left px-6 py-3">Total</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-100">
        {orders?.slice(0, 5).map((order) => (
          <tr key={order._id} className="hover:bg-gray-50 transition">
            <td className="px-6 py-3 text-sm font-medium text-gray-900">
              #{order._id.slice(-6)}
            </td>
            <td className="px-6 py-3 text-sm text-gray-500">
              {moment(order.createdAt).format("MMM DD, YYYY")}
            </td>
            <td className="px-6 py-3">
              <span
                className={`px-3 py-1 text-xs font-semibold rounded-full ${
                  order.status === "delivered"
                    ? "bg-green-100 text-green-700"
                    : order.status === "confirmed"
                    ? "bg-blue-100 text-blue-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {order.status}
              </span>
            </td>
            <td className="px-6 py-3 text-sm text-gray-800 font-semibold">
              ₹{order.finalAmount?.toLocaleString()}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default RecentOrdersTable;
