import React, { useState } from "react";
import { Package, ShoppingCart, User, Heart, Search } from "lucide-react";

function CheckoutPage() {
	const [selectedAddress, setSelectedAddress] = useState("home");
	const [selectedPayment, setSelectedPayment] = useState("credit");
	const [isProfileOpen, setIsProfileOpen] = useState(false);

	const addresses = [
		{
			id: "home",
			label: "Home",
			address: "123 Maple Street, Anytown, USA",
		},
		{
			id: "work",
			label: "Work",
			address: "456 Oak Avenue, Anytown, USA",
		},
		{
			id: "other",
			label: "Other",
			address: "789 Pine Lane, Anytown, USA",
		},
	];

	const paymentMethods = [
		{
			id: "credit",
			label: "Credit Card",
			description: "Visa ending in 1234",
		},
		{ id: "upi", label: "UPI", description: "Pay via UPI" },
		{
			id: "netbanking",
			label: "Net Banking",
			description: "Pay via Net Banking",
		},
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
									className="text-sm font-medium text-indigo-600"
								>
									Checkout
								</a>
								<a
									href="#"
									className="text-sm font-medium text-gray-700 hover:text-indigo-600 transition-colors"
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
										onClick={() =>
											setIsProfileOpen(
												!isProfileOpen
											)
										}
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
			<main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
					{/* Left Column - Forms */}
					<div className="space-y-8">
						{/* Breadcrumb */}
						<nav className="flex items-center space-x-2 text-sm">
							<button
								// onClick={
								// 	onSwitchToCart
								// }
								className="text-gray-500 hover:text-indigo-600 transition-colors"
							>
								Cart
							</button>
							<span className="text-gray-300">
								/
							</span>
							<span className="text-gray-900 font-medium">
								Checkout
							</span>
						</nav>

						<h2 className="text-3xl font-bold text-gray-900">
							Checkout
						</h2>

						{/* Shipping Address */}
						<div className="space-y-6">
							<h3 className="text-lg font-semibold text-gray-900">
								Shipping Address
							</h3>
							<div className="space-y-4">
								{addresses.map(
									(
										address
									) => (
										<label
											key={
												address.id
											}
											className={`relative flex cursor-pointer rounded-lg border p-4 shadow-sm transition-all ${
												selectedAddress ===
												address.id
													? "border-indigo-500 ring-2 ring-indigo-200 bg-indigo-50"
													: "border-gray-200 bg-white hover:border-gray-300"
											}`}
										>
											<input
												type="radio"
												name="shipping-address"
												value={
													address.id
												}
												checked={
													selectedAddress ===
													address.id
												}
												onChange={(
													e
												) =>
													setSelectedAddress(
														e
															.target
															.value
													)
												}
												className="sr-only"
											/>
											<div className="flex items-center">
												<div
													className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
														selectedAddress ===
														address.id
															? "border-indigo-500 bg-indigo-500"
															: "border-gray-300"
													}`}
												>
													{selectedAddress ===
														address.id && (
														<div className="w-2 h-2 bg-white rounded-full"></div>
													)}
												</div>
												<div className="ml-4">
													<span className="text-sm font-semibold text-gray-900">
														{
															address.label
														}
													</span>
													<p className="text-sm text-gray-600">
														{
															address.address
														}
													</p>
												</div>
											</div>
										</label>
									)
								)}
							</div>
							<button className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
								Add New Address
							</button>
						</div>

						{/* Payment Method */}
						<div className="space-y-6">
							<h3 className="text-lg font-semibold text-gray-900">
								Payment Method
							</h3>
							<div className="space-y-4">
								{paymentMethods.map(
									(
										method
									) => (
										<label
											key={
												method.id
											}
											className={`relative flex cursor-pointer rounded-lg border p-4 shadow-sm transition-all ${
												selectedPayment ===
												method.id
													? "border-indigo-500 ring-2 ring-indigo-200 bg-indigo-50"
													: "border-gray-200 bg-white hover:border-gray-300"
											}`}
										>
											<input
												type="radio"
												name="payment-method"
												value={
													method.id
												}
												checked={
													selectedPayment ===
													method.id
												}
												onChange={(
													e
												) =>
													setSelectedPayment(
														e
															.target
															.value
													)
												}
												className="sr-only"
											/>
											<div className="flex items-center">
												<div
													className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
														selectedPayment ===
														method.id
															? "border-indigo-500 bg-indigo-500"
															: "border-gray-300"
													}`}
												>
													{selectedPayment ===
														method.id && (
														<div className="w-2 h-2 bg-white rounded-full"></div>
													)}
												</div>
												<div className="ml-4">
													<span className="text-sm font-semibold text-gray-900">
														{
															method.label
														}
													</span>
													<p className="text-sm text-gray-600">
														{
															method.description
														}
													</p>
												</div>
											</div>
										</label>
									)
								)}
							</div>
						</div>
					</div>

					{/* Right Column - Order Summary */}
					<div className="space-y-8">
						<div className="bg-gray-50 rounded-lg p-6">
							<h3 className="text-lg font-semibold text-gray-900 mb-6">
								Order Summary
							</h3>
							<div className="space-y-4">
								<div className="flex justify-between border-t border-gray-200 pt-4">
									<span className="text-sm text-gray-600">
										Subtotal
									</span>
									<span className="text-sm font-medium text-gray-900">
										$120.00
									</span>
								</div>
								<div className="flex justify-between border-t border-gray-200 pt-4">
									<span className="text-sm text-gray-600">
										Shipping
									</span>
									<span className="text-sm font-medium text-gray-900">
										$5.00
									</span>
								</div>
								<div className="flex justify-between border-t border-gray-200 pt-4">
									<span className="text-sm text-gray-600">
										Discount
									</span>
									<span className="text-sm font-medium text-green-600">
										-$10.00
									</span>
								</div>
								<div className="flex justify-between border-t border-gray-200 pt-4">
									<span className="text-base font-semibold text-gray-900">
										Total
									</span>
									<span className="text-base font-semibold text-gray-900">
										$115.00
									</span>
								</div>
							</div>
						</div>

						<button className="w-full bg-indigo-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-indigo-700 transition-colors shadow-lg hover:shadow-xl">
							Place Order
						</button>
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

export default CheckoutPage;
