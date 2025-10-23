import React, { useState } from "react";
import { Plus, Minus, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";

function ShoppingCartPage() {
	const [isProfileOpen, setIsProfileOpen] = useState(false);
	const navigate = useNavigate();
	const {
		cart,
		loading,
		updateQuantity,
		removeItem,
		clearCart,
		saveForLater,
	} = useCart();

	const [wishlistItems] = useState([
		{
			id: 4,
			name: "Elegant Wristwatch",
			color: "Silver",
			price: 250.0,
			image: "https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?auto=compress&cs=tinysrgb&w=400",
		},
	]);

	const shipping = cart.items.length > 0 ? 10.0 : 0;
	const discount = cart.discount;
	const total = cart.totalAmount + shipping - discount;

	return (
		<div className="min-h-screen bg-gray-50">
			{/* Main Content */}
			<main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
				<div className="grid lg:grid-cols-3 gap-8">
					{/* Cart Items */}
					<div className="lg:col-span-2">
						<div className="flex items-center justify-between mb-6">
							<h1 className="text-3xl font-bold text-gray-900">
								Shopping Cart
							</h1>
							{cart.items.length >
								0 && (
								<button
									onClick={() =>
										clearCart()
									}
									className="bg-red-600 text-white font-bold py-3 px-4 rounded-lg mt-6 hover:bg-red-700 transition-colors shadow-lg hover:shadow-xl"
								>
									Clear
									Cart
								</button>
							)}
						</div>
						<div className="bg-white rounded-lg shadow-sm border border-gray-200">
							{cart.items.map(
								(
									item,
									index
								) => (
									<div
										key={
											item._id
										}
										className={`p-6 ${
											index !==
											cart
												.items
												.length -
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
																item.productId,
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
																item.productId,
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
														item.priceAtAddition *
														item.quantity
													).toFixed(
														2
													)}
												</p>
												<button
													onClick={() =>
														removeItem(
															item.productId
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

						{/* <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
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
						</div> */}
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
										{cart.totalAmount.toFixed(
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

							<button
								onClick={() =>
									navigate(
										"/checkout"
									)
								}
								className="w-full bg-indigo-600 text-white font-bold py-3 px-4 rounded-lg mt-6 hover:bg-indigo-700 transition-colors shadow-lg hover:shadow-xl"
							>
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
