import { Check, Truck, Home, ChevronRight, Package } from "lucide-react";
import { useOrder } from "../../hooks/useOrderQuery";
import moment from "moment";
import { Link, useParams } from "react-router-dom";

function OrderTrackingPage() {
  const { orderId } = useParams();
  const { getOrderById } = useOrder();

  const { data: order, isLoading, isError } = getOrderById(orderId);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        Loading order details...
      </div>
    );
  }

  if (isError || !order) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600">
        Failed to load order. Please try again later.
      </div>
    );
  }

  const {
    _id,
    createdAt,
    status,
    finalAmount,
    products,
    address,
    paymentStatus,
  } = order;

  const orderStatuses = [
    { id: 1, title: "Order Placed", icon: Check, completed: true },
    {
      id: 2,
      title: "Confirmed",
      icon: Package,
      completed: status !== "pending",
    },
    {
      id: 3,
      title: "Out for Delivery",
      icon: Truck,
      completed: status === "delivered" || status === "shipped",
    },
    {
      id: 4,
      title: "Delivered",
      icon: Home,
      completed: status === "delivered",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Breadcrumb */}
          <nav className="flex items-center space-x-2 text-sm mb-8">
            <Link to={"/orders"} className="text-gray-500">
              Orders
            </Link>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <span className="text-gray-900 font-medium">
              Order #{_id.slice(-6).toUpperCase()}
            </span>
          </nav>

          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">
              Order #{_id.slice(-6).toUpperCase()}
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Placed on {moment(createdAt).format("MMMM D, YYYY")}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Left Column - Order Status */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-6">
                  Order Status
                </h2>

                <div className="relative">
                  <div className="absolute left-4 top-4 h-full w-0.5 bg-gray-200"></div>

                  <div className="space-y-8">
                    {orderStatuses.map((statusItem) => {
                      const IconComponent = statusItem.icon;
                      return (
                        <div
                          key={statusItem.id}
                          className="relative flex items-start"
                        >
                          <div
                            className={`flex h-8 w-8 items-center justify-center rounded-full z-10 ${
                              statusItem.completed
                                ? "bg-indigo-600"
                                : "bg-gray-300"
                            }`}
                          >
                            <IconComponent
                              className={`w-4 h-4 ${
                                statusItem.completed
                                  ? "text-white"
                                  : "text-gray-600"
                              }`}
                            />
                          </div>
                          <div className="ml-6 flex-1">
                            <p
                              className={`font-medium ${
                                statusItem.completed
                                  ? "text-gray-900"
                                  : "text-gray-500"
                              }`}
                            >
                              {statusItem.title}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-8">
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">
                    Order Details
                  </h2>
                  <div className="space-y-4 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Shipping Address</span>
                      <span className="font-medium text-gray-800 text-right max-w-[200px] truncate">
                        {address || "Not available"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Payment Status</span>
                      <span
                        className={`font-medium ${
                          paymentStatus === "paid"
                            ? "text-green-600"
                            : "text-red-500"
                        }`}
                      >
                        {paymentStatus}
                      </span>
                    </div>
                    <div className="flex justify-between border-t border-gray-200 pt-4 mt-4">
                      <span className="text-base font-semibold text-gray-900">
                        Order Total
                      </span>
                      <span className="text-base font-semibold text-indigo-600">
                        ₹{finalAmount}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Order Items */}
          <div className="mt-12 bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="p-6">
              <h2 className="text-lg font-semibold text-gray-900">
                Items in your order
              </h2>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Product
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Quantity
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Price
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {products.map((item, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 flex items-center gap-3">
                        <Link to={`/product/${item.productId}`}>
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-12 h-12 rounded-md object-cover"
                          />
                        </Link>
                        <Link to={`/product/${item.productId}`}>
                          {item.name}
                        </Link>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {item.quantity}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                        ₹{item.priceAtAddition}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default OrderTrackingPage;
