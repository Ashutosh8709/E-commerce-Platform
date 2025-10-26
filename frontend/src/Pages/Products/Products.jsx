import React, { useState } from "react";
import {
	ArrowLeft,
	Star,
	Heart,
	ShoppingCart,
	Plus,
	Minus,
} from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getById } from "../../services/productService";

function ProductDetailPage() {
	const { productId } = useParams();
	const navigate = useNavigate();
	const [quantity, setQuantity] = useState(1);
	const [isProfileOpen, setIsProfileOpen] = useState(false);

	const { data, isLoading, isError, error, isFetching } = useQuery({
		queryKey: ["product", productId],
		queryFn: () => getById(productId),
		staleTime: 5 * 60 * 1000,
		cacheTime: 10 * 60 * 1000,
	});

	const productDetails = data?.data?.data || {};

	const relatedProducts = [
		{
			id: 1,
			name: "Smartwatch",
			price: 149.99,
			image: "https://images.pexels.com/photos/393047/pexels-photo-393047.jpeg?auto=compress&cs=tinysrgb&w=400",
		},
		{
			id: 2,
			name: "Fitness Tracker",
			price: 79.99,
			image: "https://images.pexels.com/photos/267394/pexels-photo-267394.jpeg?auto=compress&cs=tinysrgb&w=400",
		},
		{
			id: 3,
			name: "Portable Speaker",
			price: 59.99,
			image: "https://images.pexels.com/photos/1649771/pexels-photo-1649771.jpeg?auto=compress&cs=tinysrgb&w=400",
		},
		{
			id: 4,
			name: "Wireless Earbuds",
			price: 99.99,
			image: "https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=400",
		},
	];

	const reviews = [
		{
			id: 1,
			name: "Sophia Clark",
			avatar: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100",
			rating: 5,
			date: "2 months ago",
			comment: "These headphones are amazing! The sound quality is top-notch, and the noise cancellation is incredibly effective.",
		},
		{
			id: 2,
			name: "Ethan Bennett",
			avatar: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100",
			rating: 4,
			date: "3 months ago",
			comment: "I'm really happy with these headphones. Clear sound, comfortable design, and great battery life.",
		},
	];

	if (isLoading)
		return (
			<div className="flex justify-center items-center min-h-screen">
				<p className="text-gray-500 text-lg animate-pulse">
					Loading product details...
				</p>
			</div>
		);

	if (isError)
		return (
			<div className="flex justify-center items-center min-h-screen">
				<p className="text-red-500">
					Error fetching product details:{" "}
					{error.message}
				</p>
			</div>
		);

	return (
		<div className="min-h-screen bg-gray-50">
			<main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
				{/* Back Button */}
				<button
					onClick={() => navigate(-1)}
					className="flex items-center gap-2 text-gray-600 hover:text-indigo-600 mb-6 transition-colors"
				>
					<ArrowLeft className="w-4 h-4" />
					Back to Products
				</button>

				<div className="grid lg:grid-cols-2 gap-12">
					{/* Product Image */}
					<div className="space-y-4">
						<div className="aspect-square w-full rounded-xl overflow-hidden bg-gray-100">
							<img
								src={
									productDetails.productImage
								}
								alt={
									productDetails.name
								}
								className="w-full h-full object-cover"
							/>
						</div>
					</div>

					{/* Product Info */}
					<div className="space-y-6">
						<nav className="text-sm text-gray-500">
							<span>Home</span>
							<span className="mx-2">
								/
							</span>
							<span>
								{
									productDetails.brand
								}
							</span>
						</nav>

						<h1 className="text-3xl lg:text-4xl font-bold text-gray-900">
							{productDetails.name}
						</h1>

						<div className="flex items-center gap-2">
							<div className="flex text-yellow-400">
								{[
									...Array(
										4
									),
								].map(
									(
										_,
										i
									) => (
										<Star
											key={
												i
											}
											className="w-5 h-5 fill-current"
										/>
									)
								)}
								<Star className="w-5 h-5 fill-current opacity-50" />
							</div>
							<span className="text-sm text-gray-600">
								(125 reviews)
							</span>
						</div>

						<p className="text-gray-600 leading-relaxed">
							{
								productDetails.description
							}
						</p>

						{/* Price */}
						<div className="flex items-baseline gap-4">
							<span className="text-4xl font-bold text-indigo-600">
								₹
								{
									productDetails.offeredPrice
								}
							</span>
							<span className="text-xl text-gray-400 line-through">
								₹
								{
									productDetails.originalPrice
								}
							</span>
						</div>

						{/* Quantity Selector */}
						<div className="flex items-center gap-4">
							<span className="text-sm font-medium text-gray-700">
								Quantity:
							</span>
							<div className="flex items-center border border-gray-300 rounded-lg">
								<button
									onClick={() =>
										setQuantity(
											Math.max(
												1,
												quantity -
													1
											)
										)
									}
									className="p-2 hover:bg-gray-100 transition-colors"
								>
									<Minus className="w-4 h-4" />
								</button>
								<span className="px-4 py-2 font-medium">
									{
										quantity
									}
								</span>
								<button
									onClick={() =>
										setQuantity(
											quantity +
												1
										)
									}
									className="p-2 hover:bg-gray-100 transition-colors"
								>
									<Plus className="w-4 h-4" />
								</button>
							</div>
						</div>

						{/* Action Buttons */}
						<div className="flex gap-4">
							<button className="flex-1 bg-indigo-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-indigo-700 transition-colors shadow-lg hover:shadow-xl flex items-center justify-center gap-2">
								<ShoppingCart className="w-5 h-5" />
								Add to Cart
							</button>
							<button className="bg-gray-200 text-gray-800 font-semibold py-3 px-6 rounded-lg hover:bg-gray-300 transition-colors flex items-center justify-center gap-2">
								<Heart className="w-5 h-5" />
								Add to Wishlist
							</button>
						</div>

						{isFetching && (
							<p className="text-sm text-gray-400 animate-pulse">
								Refreshing
								latest data...
							</p>
						)}
					</div>
				</div>

				{/* Related Products & Reviews */}
				<section className="mt-16">
					<h2 className="text-2xl font-bold text-gray-900 mb-8">
						Customer Reviews
					</h2>
					<div className="grid md:grid-cols-2 gap-8">
						{reviews.map((review) => (
							<div
								key={review.id}
								className="bg-white p-6 rounded-lg shadow-sm border border-gray-200"
							>
								<div className="flex items-center gap-4 mb-4">
									<img
										src={
											review.avatar
										}
										alt={
											review.name
										}
										className="w-12 h-12 rounded-full object-cover"
									/>
									<div>
										<p className="font-semibold text-gray-900">
											{
												review.name
											}
										</p>
										<p className="text-sm text-gray-500">
											{
												review.date
											}
										</p>
									</div>
								</div>
								<div className="flex text-yellow-400 mb-2">
									{[
										...Array(
											review.rating
										),
									].map(
										(
											_,
											i
										) => (
											<Star
												key={
													i
												}
												className="w-4 h-4 fill-current"
											/>
										)
									)}
								</div>
								<p className="text-gray-600">
									{
										review.comment
									}
								</p>
							</div>
						))}
					</div>
					{/* Related Products */}{" "}
					<div className="mt-16">
						{" "}
						<h2 className="text-2xl font-bold text-gray-900 mb-8">
							{" "}
							Related Products{" "}
						</h2>{" "}
						<div className="grid grid-cols-2 md:grid-cols-4 gap-6">
							{" "}
							{relatedProducts.map(
								(product) => (
									<div
										key={
											product.id
										}
										className="group"
									>
										{" "}
										<div className="aspect-square w-full bg-gray-100 rounded-lg mb-4 overflow-hidden">
											{" "}
											<img
												src={
													product.image
												}
												alt={
													product.name
												}
												className="w-full h-full object-cover transition-transform group-hover:scale-105"
											/>{" "}
										</div>{" "}
										<h3 className="font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors">
											{" "}
											{
												product.name
											}{" "}
										</h3>{" "}
										<p className="text-gray-600">
											{" "}
											${" "}
											{
												product.price
											}{" "}
										</p>{" "}
									</div>
								)
							)}{" "}
						</div>
					</div>
				</section>
			</main>

			{isProfileOpen && (
				<div
					className="fixed inset-0 z-40"
					onClick={() => setIsProfileOpen(false)}
				/>
			)}
		</div>
	);
}

export default ProductDetailPage;
