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
			{/* Header */}
			<header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200 shadow-sm">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex items-center justify-between h-16">
						{/* Logo */}
						<div className="flex items-center gap-8">
							<div className="flex items-center gap-3">
								<div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
									<Package className="w-5 h-5 text-white" />
								</div>
								<span className="text-xl font-bold text-gray-900">
									SwiftCart
								</span>
							</div>

							{/* Desktop Navigation */}
							<nav className="hidden md:flex items-center gap-8">
								<button
									// onClick={
									// 	onSwitchToProducts
									// }
									className="text-sm font-medium text-gray-700 hover:text-indigo-600 transition-colors"
								>
									Home
								</button>
								<a
									href="#"
									className="text-sm font-medium text-gray-700 hover:text-indigo-600 transition-colors"
								>
									Shop
								</a>
								<a
									href="#"
									className="text-sm font-medium text-indigo-600"
								>
									Support
								</a>
							</nav>
						</div>

						{/* Right Side */}
						<div className="flex items-center gap-4">
							{/* Search Bar */}
							<div className="hidden md:flex relative">
								<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
								<input
									type="text"
									placeholder="Search..."
									className="w-48 lg:w-64 pl-10 pr-4 py-2 text-sm rounded-lg bg-gray-100 border-transparent focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
								/>
							</div>

							{/* Action Buttons */}
							<div className="flex items-center gap-2">
								<button className="p-2 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-full transition-colors">
									<Heart className="w-5 h-5" />
								</button>

								<button
									// onClick={
									// 	onSwitchToCart
									// }
									className="relative p-2 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-full transition-colors"
								>
									<ShoppingCart className="w-5 h-5" />
									<span className="absolute -top-1 -right-1 w-5 h-5 bg-indigo-600 text-white text-xs rounded-full flex items-center justify-center">
										3
									</span>
								</button>

								{/* Profile */}
								<div className="relative">
									<button
										// onClick={() =>
										// 	setIsProfileOpen(
										// 		!isProfileOpen
										// 	)
										// }
										className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center border-2 border-indigo-200"
									>
										<User className="w-5 h-5 text-white" />
									</button>

									{/* Profile Dropdown */}
									{isProfileOpen && (
										<div className="absolute right-0 mt-2 w-64 bg-white/95 backdrop-blur-md rounded-xl shadow-2xl border border-gray-200/50 py-2 z-50">
											<div className="px-4 py-3 border-b border-gray-100">
												<div className="flex items-center gap-3">
													<div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
														<User className="w-5 h-5 text-white" />
													</div>
													<div>
														<p className="font-medium text-gray-900">
															John
															Doe
														</p>
														<p className="text-sm text-gray-500">
															john.doe@example.com
														</p>
													</div>
												</div>
											</div>

											<div className="py-2">
												<button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors">
													My
													Profile
												</button>
												<button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors">
													My
													Orders
												</button>
												<button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors">
													Settings
												</button>
											</div>

											<div className="border-t border-gray-100 pt-2">
												<button
													// onClick={
													// 	onSwitchToLogin
													// }
													className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
												>
													Sign
													Out
												</button>
											</div>
										</div>
									)}
								</div>
							</div>
						</div>
					</div>
				</div>
			</header>

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
