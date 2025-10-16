import React, { useState } from "react";
import {
	Package,
	Check,
	Truck,
	Home,
	User,
	Heart,
	Search,
	ShoppingCart,
	ChevronRight,
} from "lucide-react";

function OrderTrackingPage() {
	const [isProfileOpen, setIsProfileOpen] = useState(false);

	const orderStatuses = [
		{
			id: "placed",
			title: "Order Placed",
			time: "July 15, 2024, 10:00 AM",
			completed: true,
			icon: Check,
		},
		{
			id: "confirmed",
			title: "Order Confirmed",
			time: "July 15, 2024, 10:30 AM",
			completed: true,
			icon: Check,
		},
		{
			id: "shipped",
			title: "Order Shipped",
			time: "July 15, 2024, 12:00 PM",
			completed: true,
			icon: Truck,
		},
		{
			id: "delivery",
			title: "Out for Delivery",
			time: "July 15, 2024, 2:00 PM",
			completed: true,
			icon: Truck,
		},
		{
			id: "delivered",
			title: "Delivered",
			time: "Pending",
			completed: false,
			icon: Home,
		},
	];

	const orderItems = [
		{ name: "Premium Running Shoes", quantity: 1, price: "$49.99" },
		{ name: "Athletic Socks", quantity: 2, price: "$10.00" },
	];

	return (
		<div className="min-h-screen bg-gray-50">
			{/* Main Content */}
			<main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
				<div className="max-w-4xl mx-auto">
					{/* Breadcrumb */}
					<nav className="flex items-center space-x-2 text-sm mb-8">
						<span className="text-gray-500">
							Orders
						</span>
						<ChevronRight className="w-4 h-4 text-gray-400" />
						<span className="text-gray-900 font-medium">
							Order #12345
						</span>
					</nav>

					{/* Header */}
					<div className="mb-8">
						<h1 className="text-3xl font-bold text-gray-900">
							Order #12345
						</h1>
						<p className="text-sm text-gray-500 mt-1">
							Placed on July 15, 2024
						</p>
					</div>

					<div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
						{/* Left Column - Order Status */}
						<div className="lg:col-span-2">
							<div className="bg-white rounded-lg shadow-sm p-6">
								<h2 className="text-lg font-semibold text-gray-900 mb-6">
									Order
									Status
								</h2>
								<div className="relative">
									{/* Progress Line */}
									<div className="absolute left-4 top-4 h-full w-0.5 bg-gray-200"></div>

									<div className="space-y-8">
										{orderStatuses.map(
											(
												status,
												index
											) => {
												const IconComponent =
													status.icon;
												return (
													<div
														key={
															status.id
														}
														className="relative flex items-start"
													>
														<div
															className={`flex h-8 w-8 items-center justify-center rounded-full z-10 ${
																status.completed
																	? "bg-indigo-600"
																	: "bg-gray-300"
															}`}
														>
															<IconComponent
																className={`w-4 h-4 ${
																	status.completed
																		? "text-white"
																		: "text-gray-600"
																}`}
															/>
														</div>
														<div className="ml-6 flex-1">
															<p
																className={`font-medium ${
																	status.completed
																		? "text-gray-900"
																		: "text-gray-500"
																}`}
															>
																{
																	status.title
																}
															</p>
															<p className="text-sm text-gray-500">
																{
																	status.time
																}
															</p>
														</div>
													</div>
												);
											}
										)}
									</div>
								</div>
							</div>
						</div>

						{/* Right Column - Order Details */}
						<div className="lg:col-span-1">
							<div className="sticky top-24 space-y-8">
								{/* Map */}
								<div className="aspect-video w-full rounded-lg bg-gray-200 overflow-hidden">
									<img
										src="https://images.pexels.com/photos/2422915/pexels-photo-2422915.jpeg?auto=compress&cs=tinysrgb&w=600"
										alt="Delivery map"
										className="w-full h-full object-cover"
									/>
								</div>

								{/* Order Details */}
								<div className="bg-white rounded-lg shadow-sm p-6">
									<h2 className="text-lg font-semibold text-gray-900 mb-4">
										Order
										Details
									</h2>
									<div className="space-y-4 text-sm">
										<div className="flex justify-between">
											<span className="text-gray-500">
												Shipping
												Address
											</span>
											<span className="font-medium text-gray-800 text-right">
												123
												Elm
												St,
												SF,
												CA
											</span>
										</div>
										<div className="flex justify-between">
											<span className="text-gray-500">
												Payment
											</span>
											<span className="font-medium text-gray-800">
												Visa
												****
												4242
											</span>
										</div>
										<div className="flex justify-between border-t border-gray-200 pt-4 mt-4">
											<span className="text-base font-semibold text-gray-900">
												Order
												Total
											</span>
											<span className="text-base font-semibold text-indigo-600">
												$59.99
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
								Items in your
								order
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
									{orderItems.map(
										(
											item,
											index
										) => (
											<tr
												key={
													index
												}
											>
												<td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
													{
														item.name
													}
												</td>
												<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
													{
														item.quantity
													}
												</td>
												<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
													{
														item.price
													}
												</td>
											</tr>
										)
									)}
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</main>

			{/* Click outside to close dropdown */}
			{isProfileOpen && (
				<div
					className="fixed inset-0 z-40"
					onClick={() => setIsProfileOpen(false)}
				/>
			)}
		</div>
	);
}

export default OrderTrackingPage;
