import { useState, useMemo } from "react";
import { ShoppingCart, Search, Eye, RefreshCw } from "lucide-react";
import moment from "moment";
import { useAdminData } from "../../hooks/useAdminData";
import { handleSuccess } from "../../utils";

function OrdersPage() {
  const { orders, loading } = useAdminData();
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("date");
  const [sortOrder, setSortOrder] = useState("desc");

  const filteredOrders = useMemo(() => {
    let result = [...(orders || [])];

    if (search.trim()) {
      const query = search.toLowerCase();
      result = result.filter(
        (order) =>
          order._id.toLowerCase().includes(query) ||
          order.user?.name?.toLowerCase().includes(query)
      );
    }

    result.sort((a, b) => {
      if (sortBy === "date") {
        const da = new Date(a.createdAt);
        const db = new Date(b.createdAt);
        return sortOrder === "asc" ? da - db : db - da;
      }
      if (sortBy === "total") {
        return sortOrder === "asc"
          ? a.finalAmount - b.finalAmount
          : b.finalAmount - a.finalAmount;
      }
      return 0;
    });

    return result;
  }, [orders, search, sortBy, sortOrder]);

  const handleRefreshStatus = (id) => {
    // TODO: trigger API or socket event
    handleSuccess(`Refreshed status for ${id.slice(-6)}`);
  };

  const toggleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortOrder("asc");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-500">
        Loading orders...
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2 mb-4 sm:mb-0">
          <ShoppingCart size={20} /> All Orders
        </h2>
        <div className="relative w-full sm:w-64">
          <Search
            size={16}
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search orders..."
            className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-600 border-collapse">
          <thead className="bg-gray-50 text-gray-700 uppercase text-xs font-medium">
            <tr>
              <th
                className="px-6 py-3 cursor-pointer select-none"
                onClick={() => toggleSort("date")}
              >
                Date {sortBy === "date" && (sortOrder === "asc" ? "▲" : "▼")}
              </th>
              <th className="px-6 py-3">Order ID</th>
              <th className="px-6 py-3">Customer</th>
              <th
                className="px-6 py-3 cursor-pointer select-none"
                onClick={() => toggleSort("total")}
              >
                Total (₹){" "}
                {sortBy === "total" && (sortOrder === "asc" ? "▲" : "▼")}
              </th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Payment</th>
              <th className="px-6 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredOrders.length > 0 ? (
              filteredOrders.map((order) => (
                <tr key={order._id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-3">
                    {moment(order.createdAt).format("MMM DD, YYYY")}
                  </td>
                  <td className="px-6 py-3 font-medium text-gray-800">
                    #{order._id.slice(-6)}
                  </td>
                  <td className="px-6 py-3 text-gray-700">
                    {order.user?.name || "Guest"}
                  </td>
                  <td className="px-6 py-3 font-semibold text-gray-900">
                    ₹{order.finalAmount.toLocaleString()}
                  </td>
                  <td className="px-6 py-3">
                    <span
                      className={`px-3 py-1 text-xs font-semibold rounded-full ${
                        order.status === "delivered"
                          ? "bg-green-100 text-green-700"
                          : order.status === "confirmed"
                          ? "bg-blue-100 text-blue-700"
                          : order.status === "pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {order.status || "N/A"}
                    </span>
                  </td>
                  <td className="px-6 py-3">
                    <span
                      className={`px-3 py-1 text-xs font-semibold rounded-full ${
                        order.paymentStatus === "paid"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {order.paymentStatus || "N/A"}
                    </span>
                  </td>
                  <td className="px-6 py-3 flex justify-end gap-2">
                    <button
                      onClick={() => handleRefreshStatus(order._id)}
                      className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg"
                      title="Update Status"
                    >
                      <RefreshCw size={16} />
                    </button>
                    <button
                      className="p-2 text-gray-700 hover:bg-gray-100 rounded-lg"
                      title="View Details"
                    >
                      <Eye size={16} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="text-center py-6 text-gray-500">
                  No orders found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default OrdersPage;
