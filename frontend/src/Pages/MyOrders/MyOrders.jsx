import React, { useState } from "react";
import { Package, Eye, Download, RefreshCw, Truck } from "lucide-react";

function MyOrders() {
	const [selectedFilter, setSelectedFilter] = useState("all");

	const orders = [
		{
			id: "#12345",
			date: "July 15, 2024",
			status: "Delivered",
			total: "$199.99",
			items: 2,
			image: "https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=400",
			statusColor: "text-green-600 bg-green-50",
		},
		{
			id: "#12344",
			date: "July 10, 2024",
			status: "In Transit",
			total: "$89.99",
			items: 1,
			image: "https://images.pexels.com/photos/1656684/pexels-photo-1656684.jpeg?auto=compress&cs=tinysrgb&w=400",
			statusColor: "text-blue-600 bg-blue-50",
		},
		{
			id: "#12343",
			date: "July 5, 2024",
			status: "Processing",
			total: "$149.99",
			items: 3,
			image: "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=400",
			statusColor: "text-yellow-600 bg-yellow-50",
		},
		{
			id: "#12342",
			date: "June 28, 2024",
			status: "Delivered",
			total: "$79.99",
			items: 1,
			image: "https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=400",
			statusColor: "text-green-600 bg-green-50",
		},
		{
			id: "#12341",
			date: "June 20, 2024",
			status: "Cancelled",
			total: "$59.99",
			items: 1,
			image: "https://images.pexels.com/photos/1191531/pexels-photo-1191531.jpeg?auto=compress&cs=tinysrgb&w=400",
			statusColor: "text-red-600 bg-red-50",
		},
	];

	const filterOptions = [
		{ value: "all", label: "All Orders" },
		{ value: "delivered", label: "Delivered" },
		{ value: "processing", label: "Processing" },
		{ value: "transit", label: "In Transit" },
		{ value: "cancelled", label: "Cancelled" },
	];

	const filteredOrders =
		selectedFilter === "all"
			? orders
			: orders.filter((order) =>
					order.status
						.toLowerCase()
						.includes(
							selectedFilter.replace(
								"transit",
								"transit"
							)
						)
			  );

	return (
		<div className="min-h-screen bg-gray-50">
			{/* Main Content */}
			<main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
				<div className="mb-8">
					<h1 className="text-3xl font-bold text-gray-900">
						My Orders
					</h1>
					<p className="text-gray-600 mt-2">
						Track and manage your orders
					</p>
				</div>

				{/* Filters */}
				<div className="mb-8">
					<div className="flex flex-wrap gap-2">
						{filterOptions.map((option) => (
							<button
								key={
									option.value
								}
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
				</div>

				{/* Orders List */}
				<div className="space-y-6">
					{filteredOrders.map((order) => (
						<div
							key={order.id}
							className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
						>
							<div className="p-6">
								<div className="flex items-center justify-between mb-4">
									<div className="flex items-center gap-4">
										<img
											src={
												order.image
											}
											alt="Order item"
											className="w-16 h-16 rounded-lg object-cover"
										/>
										<div>
											<h3 className="font-semibold text-gray-900">
												Order{" "}
												{
													order.id
												}
											</h3>
											<p className="text-sm text-gray-500">
												{
													order.date
												}{" "}
												•{" "}
												{
													order.items
												}{" "}
												item
												{order.items >
												1
													? "s"
													: ""}
											</p>
										</div>
									</div>
									<div className="text-right">
										<div
											className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${order.statusColor}`}
										>
											{
												order.status
											}
										</div>
										<p className="text-lg font-semibold text-gray-900 mt-1">
											{
												order.total
											}
										</p>
									</div>
								</div>

								<div className="flex items-center justify-between pt-4 border-t border-gray-200">
									<div className="flex items-center gap-4">
										<button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors">
											<Eye className="w-4 h-4" />
											View
											Details
										</button>
										{order.status ===
											"Delivered" && (
											<button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
												<Download className="w-4 h-4" />
												Download
												Invoice
											</button>
										)}
									</div>
									<div className="flex items-center gap-2">
										{order.status ===
											"In Transit" && (
											<button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
												<Truck className="w-4 h-4" />
												Track
												Order
											</button>
										)}
										{order.status ===
											"Delivered" && (
											<button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-green-600 hover:bg-green-50 rounded-lg transition-colors">
												<RefreshCw className="w-4 h-4" />
												Reorder
											</button>
										)}
									</div>
								</div>
							</div>
						</div>
					))}
				</div>

				{filteredOrders.length === 0 && (
					<div className="text-center py-12">
						<Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
						<h3 className="text-lg font-medium text-gray-900 mb-2">
							No orders found
						</h3>
						<p className="text-gray-500 mb-6">
							You haven't placed any
							orders matching the
							selected filter.
						</p>
						<button
							onClick={
								onSwitchToProducts
							}
							className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors"
						>
							Start Shopping
						</button>
					</div>
				)}
			</main>
		</div>
	);
}

export default MyOrders;
