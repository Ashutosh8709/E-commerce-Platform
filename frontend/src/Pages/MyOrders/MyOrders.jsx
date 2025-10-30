import React, { useEffect, useState } from "react";
import { Eye, RefreshCw, Package } from "lucide-react";
import { useOrder } from "../../hooks/useOrderQuery";
import moment from "moment";

function MyOrders() {
	const [selectedFilter, setSelectedFilter] = useState("all");
	const { orders, loading } = useOrder();

	const filterOptions = [
		{ value: "all", label: "All Orders" },
		{ value: "confirmed", label: "Confirmed" },
		{ value: "placed", label: "Placed" },
		{ value: "delivered", label: "Delivered" },
		{ value: "cancelled", label: "Cancelled" },
	];

	// Filter orders
	const filteredOrders =
		selectedFilter === "all"
			? orders
			: orders.filter((order) =>
					order.status
						?.toLowerCase()
						.includes(selectedFilter)
			  );

	console.log(filteredOrders);

	if (loading) {
		return (
			<div className="flex justify-center items-center h-96">
				<div className="text-gray-500">
					Loading orders...
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-gray-50">
			<main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
				{/* Header */}
				<div className="mb-8">
					<h1 className="text-3xl font-bold text-gray-900">
						My Orders
					</h1>
					<p className="text-gray-600 mt-2">
						View and manage your previous
						orders
					</p>
				</div>

				{/* Filters */}
				<div className="mb-8 flex flex-wrap gap-2">
					{filterOptions.map((option) => (
						<button
							key={option.value}
							onClick={() =>
								setSelectedFilter(
									option.value
								)
							}
							className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
								selectedFilter ===
								option.value
									? "bg-indigo-600 text-white"
									: "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
							}`}
						>
							{option.label}
						</button>
					))}
				</div>

				{/* Orders List */}
				{filteredOrders.length > 0 ? (
					<div className="space-y-6">
						{filteredOrders.map((order) => (
							<div
								key={order._id}
								className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
							>
								{/* Header */}
								<div className="flex justify-between items-center px-6 py-4 border-b border-gray-100">
									<div>
										<h3 className="font-semibold text-gray-900">
											Order
											#
											{order._id
												.slice(
													-6
												)
												.toUpperCase()}
										</h3>
										<p className="text-sm text-gray-500">
											Placed
											on{" "}
											{moment(
												order.createdAt
											).format(
												"MMM DD, YYYY"
											)}
										</p>
									</div>
									<div className="text-right">
										<span
											className={`px-3 py-1 text-sm rounded-full font-medium ${
												order.status ===
												"confirmed"
													? "bg-green-50 text-green-600"
													: order.status ===
													  "placed"
													? "bg-yellow-50 text-yellow-600"
													: order.status ===
													  "cancelled"
													? "bg-red-50 text-red-600"
													: "bg-gray-100 text-gray-600"
											}`}
										>
											{
												order.status
											}
										</span>
										<p className="font-semibold text-gray-900 mt-1">
											₹
											{
												order.finalAmount
											}
										</p>
									</div>
								</div>

								{/* Products */}
								<div className="divide-y divide-gray-100">
									{order.products.map(
										(
											item
										) => (
											<div
												key={
													item._id
												}
												className="flex items-center justify-between px-6 py-4"
											>
												<div className="flex items-center gap-4">
													<img
														src={
															item?.image ||
															"https://via.placeholder.com/80"
														}
														alt={
															item?.name ||
															"Product"
														}
														className="w-16 h-16 rounded-md object-cover border"
													/>
													<div>
														<h4 className="font-medium text-gray-900">
															{item?.name ||
																"Product"}
														</h4>
														<p className="text-sm text-gray-500">
															Color:{" "}
															{
																item.color
															}

															,
															Size:{" "}
															{
																item.size
															}
														</p>
														<p className="text-sm text-gray-500">
															Qty:{" "}
															{
																item.quantity
															}
														</p>
													</div>
												</div>
												<p className="font-semibold text-gray-900">
													₹
													{
														item.priceAtAddition
													}
												</p>
											</div>
										)
									)}
								</div>

								{/* Footer */}
								<div className="flex justify-end items-center gap-4 px-6 py-4 border-t border-gray-100 bg-gray-50">
									<button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-indigo-600 hover:bg-indigo-50 rounded-lg transition">
										<Eye className="w-4 h-4" />
										View
										Details
									</button>

									{order.status ===
										"confirmed" && (
										<button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-green-600 hover:bg-green-50 rounded-lg transition">
											<RefreshCw className="w-4 h-4" />
											Reorder
										</button>
									)}
								</div>
							</div>
						))}
					</div>
				) : (
					<div className="text-center py-20">
						<Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
						<h3 className="text-lg font-medium text-gray-900 mb-2">
							No orders found
						</h3>
						<p className="text-gray-500 mb-6">
							You haven’t placed any
							orders yet.
						</p>
						<button className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors">
							Start Shopping
						</button>
					</div>
				)}
			</main>
		</div>
	);
}

export default MyOrders;
