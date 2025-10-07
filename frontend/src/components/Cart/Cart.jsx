import React, { useState } from "react";
import { ShoppingCart, Heart, Plus, Minus, Trash2 } from "lucide-react";

function ShoppingCartPage() {
	const [isProfileOpen, setIsProfileOpen] = useState(false);
	const [cartItems, setCartItems] = useState([
		{
			id: 1,
			name: "Premium Cotton T-Shirt",
			size: "M",
			color: "Blue",
			price: 30.0,
			quantity: 2,
			image: "https://images.pexels.com/photos/1656684/pexels-photo-1656684.jpeg?auto=compress&cs=tinysrgb&w=400",
		},
		{
			id: 2,
			name: "Running Shoes",
			size: "8",
			color: "Black",
			price: 80.0,
			quantity: 1,
			image: "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=400",
		},
		{
			id: 3,
			name: "Leather Backpack",
			size: "One Size",
			color: "Brown",
			price: 120.0,
			quantity: 1,
			image: "https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=400",
		},
	]);

	const [wishlistItems] = useState([
		{
			id: 4,
			name: "Elegant Wristwatch",
			color: "Silver",
			price: 250.0,
			image: "https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?auto=compress&cs=tinysrgb&w=400",
		},
	]);

	const updateQuantity = (id, newQuantity) => {
		if (newQuantity < 1) return;
		setCartItems((items) =>
			items.map((item) =>
				item.id === id
					? { ...item, quantity: newQuantity }
					: item
			)
		);
	};

	const removeItem = (id) => {
		setCartItems((items) => items.filter((item) => item.id !== id));
	};

	const subtotal = cartItems.reduce(
		(sum, item) => sum + item.price * item.quantity,
		0
	);
	const shipping = 10.0;
	const discount = 20.0;
	const total = subtotal + shipping - discount;

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
									<ShoppingCart className="w-5 h-5 text-white" />
								</div>
								<span className="text-xl font-bold text-gray-900">
									ShopSmart
								</span>
							</div>

							{/* Desktop Navigation */}
							<nav className="hidden md:flex items-center gap-8">
								<button className="text-sm font-medium text-gray-700 hover:text-indigo-600 transition-colors">
									Home
								</button>
								<a
									href="#"
									className="text-sm font-medium text-indigo-600"
								>
									Shop
								</a>
								<a
									href="#"
									className="text-sm font-medium text-gray-700 hover:text-indigo-600 transition-colors"
								>
									Categories
								</a>
								<a
									href="#"
									className="text-sm font-medium text-gray-700 hover:text-indigo-600 transition-colors"
								>
									Deals
								</a>
							</nav>
						</div>

						{/* Right Side */}
						<div className="flex items-center gap-4">
							{/* Search Bar */}
							<div className="hidden md:flex relative">
								<input
									type="text"
									placeholder="Search..."
									className="w-48 lg:w-64 pl-4 pr-4 py-2 text-sm rounded-lg bg-gray-100 border-transparent focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
								/>
							</div>

							{/* Action Buttons */}
							<div className="flex items-center gap-2">
								<button className="p-2 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-full transition-colors">
									<Heart className="w-5 h-5" />
								</button>

								<button className="relative p-2 text-indigo-600 bg-indigo-50 rounded-full">
									<ShoppingCart className="w-5 h-5" />
									<span className="absolute -top-1 -right-1 w-5 h-5 bg-indigo-600 text-white text-xs rounded-full flex items-center justify-center">
										{
											cartItems.length
										}
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
										<div className="w-6 h-6 bg-white rounded-full"></div>
									</button>

									{/* Profile Dropdown */}
									{isProfileOpen && (
										<div className="absolute right-0 mt-2 w-64 bg-white/95 backdrop-blur-md rounded-xl shadow-2xl border border-gray-200/50 py-2 z-50">
											<div className="px-4 py-3 border-b border-gray-100">
												<div className="flex items-center gap-3">
													<div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
														<div className="w-6 h-6 bg-white rounded-full"></div>
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
													Wishlist
												</button>
												<button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors">
													Settings
												</button>
											</div>

											<div className="border-t border-gray-100 pt-2">
												<button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors">
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
				<div className="grid lg:grid-cols-3 gap-8">
					{/* Cart Items */}
					<div className="lg:col-span-2">
						<h1 className="text-3xl font-bold text-gray-900 mb-6">
							Shopping Cart
						</h1>

						<div className="bg-white rounded-lg shadow-sm border border-gray-200">
							{cartItems.map(
								(
									item,
									index
								) => (
									<div
										key={
											item.id
										}
										className={`p-6 ${
											index !==
											cartItems.length -
												1
												? "border-b border-gray-200"
												: ""
										}`}
									>
										<div className="flex items-center gap-6">
											<img
												src={
													item.image
												}
												alt={
													item.name
												}
												className="w-24 h-24 rounded-lg object-cover"
											/>

											<div className="flex-1">
												<h3 className="font-semibold text-gray-900">
													{
														item.name
													}
												</h3>
												<p className="text-sm text-gray-500">
													Size:{" "}
													{
														item.size
													}

													,
													Color:{" "}
													{
														item.color
													}
												</p>

												<div className="flex items-center gap-2 mt-2">
													<button
														onClick={() =>
															updateQuantity(
																item.id,
																item.quantity -
																	1
															)
														}
														className="p-1 rounded text-gray-500 hover:bg-gray-200 transition-colors"
													>
														<Minus className="w-4 h-4" />
													</button>
													<span className="w-8 text-center text-sm font-medium">
														{
															item.quantity
														}
													</span>
													<button
														onClick={() =>
															updateQuantity(
																item.id,
																item.quantity +
																	1
															)
														}
														className="p-1 rounded text-gray-500 hover:bg-gray-200 transition-colors"
													>
														<Plus className="w-4 h-4" />
													</button>
												</div>
											</div>

											<div className="text-right">
												<p className="font-semibold text-lg text-gray-900">
													$
													{(
														item.price *
														item.quantity
													).toFixed(
														2
													)}
												</p>
												<button
													onClick={() =>
														removeItem(
															item.id
														)
													}
													className="text-xs text-red-500 hover:text-red-700 mt-2 flex items-center gap-1"
												>
													<Trash2 className="w-3 h-3" />
													Remove
												</button>
											</div>
										</div>
									</div>
								)
							)}
						</div>

						{/* Wishlist */}
						<h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
							Your Wishlist
						</h2>
						<div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
							{wishlistItems.map(
								(item) => (
									<div
										key={
											item.id
										}
										className="flex items-center gap-6"
									>
										<img
											src={
												item.image
											}
											alt={
												item.name
											}
											className="w-24 h-24 rounded-lg object-cover"
										/>

										<div className="flex-1">
											<h3 className="font-semibold text-gray-900">
												{
													item.name
												}
											</h3>
											<p className="text-sm text-gray-500">
												Color:{" "}
												{
													item.color
												}
											</p>
											<p className="font-semibold text-lg text-gray-900 mt-2">
												$
												{item.price.toFixed(
													2
												)}
											</p>
										</div>

										<div className="flex flex-col items-end gap-2">
											<button className="bg-indigo-100 text-indigo-600 text-sm font-semibold py-2 px-4 rounded-lg hover:bg-indigo-200 transition-colors">
												Move
												to
												Cart
											</button>
											<button className="text-xs text-red-500 hover:text-red-700 flex items-center gap-1">
												<Trash2 className="w-3 h-3" />
												Remove
											</button>
										</div>
									</div>
								)
							)}
						</div>
					</div>

					{/* Order Summary */}
					<div className="lg:col-span-1">
						<div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-24">
							<h2 className="text-xl font-bold text-gray-900 border-b border-gray-200 pb-4 mb-4">
								Order Summary
							</h2>

							<div className="space-y-3">
								<div className="flex justify-between text-sm text-gray-600">
									<span>
										Subtotal
									</span>
									<span className="font-medium text-gray-900">
										$
										{subtotal.toFixed(
											2
										)}
									</span>
								</div>
								<div className="flex justify-between text-sm text-gray-600">
									<span>
										Shipping
									</span>
									<span className="font-medium text-gray-900">
										$
										{shipping.toFixed(
											2
										)}
									</span>
								</div>
								<div className="flex justify-between text-sm text-green-600">
									<span>
										Discount
									</span>
									<span className="font-medium">
										-$
										{discount.toFixed(
											2
										)}
									</span>
								</div>
							</div>

							<div className="border-t border-gray-200 mt-4 pt-4">
								<div className="flex justify-between font-bold text-gray-900 text-lg">
									<span>
										Total
									</span>
									<span>
										$
										{total.toFixed(
											2
										)}
									</span>
								</div>
							</div>

							<button className="w-full bg-indigo-600 text-white font-bold py-3 px-4 rounded-lg mt-6 hover:bg-indigo-700 transition-colors shadow-lg hover:shadow-xl">
								Proceed to
								Checkout
							</button>
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

export default ShoppingCartPage;
