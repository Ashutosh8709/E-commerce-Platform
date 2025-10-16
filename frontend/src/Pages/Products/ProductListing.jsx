import React, { useState } from "react";
import {
	Search,
	Heart,
	ShoppingCart,
	Filter,
	Grid2x2 as Grid,
	List,
	ChevronDown,
	ChevronLeft,
	ChevronRight,
} from "lucide-react";

function ProductListing() {
	const [isProfileOpen, setIsProfileOpen] = useState(false);
	const [selectedCategory, setSelectedCategory] = useState([]);
	const [selectedColor, setSelectedColor] = useState("white");
	const [selectedSize, setSelectedSize] = useState("M");
	const [priceRange, setPriceRange] = useState(250);
	const [viewMode, setViewMode] = useState("grid");
	const [sortBy, setSortBy] = useState("featured");

	const categories = [
		"Clothing",
		"Shoes",
		"Accessories",
		"Bags",
		"Jewelry",
	];

	const colors = [
		{ name: "White", value: "white", color: "bg-white" },
		{ name: "Black", value: "black", color: "bg-black" },
		{ name: "Red", value: "red", color: "bg-red-500" },
		{ name: "Green", value: "green", color: "bg-green-500" },
		{ name: "Blue", value: "blue", color: "bg-blue-500" },
	];

	const sizes = ["XS", "S", "M", "L", "XL"];

	const products = [
		{
			id: 1,
			name: "Elegant Black Dress",
			price: 79.99,
			image: "https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=400",
			category: "Clothing",
		},
		{
			id: 2,
			name: "Casual Denim Jacket",
			price: 59.99,
			image: "https://images.pexels.com/photos/1124465/pexels-photo-1124465.jpeg?auto=compress&cs=tinysrgb&w=400",
			category: "Clothing",
		},
		{
			id: 3,
			name: "Leather Ankle Boots",
			price: 129.99,
			image: "https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=400",
			category: "Shoes",
		},
		{
			id: 4,
			name: "Stylish Handbag",
			price: 89.99,
			image: "https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=400",
			category: "Bags",
		},
		{
			id: 5,
			name: "Silver Hoop Earrings",
			price: 29.99,
			image: "https://images.pexels.com/photos/1191531/pexels-photo-1191531.jpeg?auto=compress&cs=tinysrgb&w=400",
			category: "Jewelry",
		},
		{
			id: 6,
			name: "Classic White Sneakers",
			price: 69.99,
			image: "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=400",
			category: "Shoes",
		},
		{
			id: 7,
			name: "Cozy Knit Sweater",
			price: 49.99,
			image: "https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=400",
			category: "Clothing",
		},
		{
			id: 8,
			name: "Statement Necklace",
			price: 39.99,
			image: "https://images.pexels.com/photos/1191531/pexels-photo-1191531.jpeg?auto=compress&cs=tinysrgb&w=400",
			category: "Jewelry",
		},
	];

	const handleCategoryChange = (category) => {
		setSelectedCategory((prev) =>
			prev.includes(category)
				? prev.filter((c) => c !== category)
				: [...prev, category]
		);
	};

	return (
		<div className="min-h-screen bg-gray-50">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
				<div className="flex gap-8">
					{/* Sidebar Filters */}
					<aside className="w-80 hidden lg:block">
						<div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-8">
							{/* Categories */}
							<div>
								<h3 className="text-lg font-bold text-gray-900 mb-4">
									Categories
								</h3>
								<div className="space-y-3">
									{categories.map(
										(
											category
										) => (
											<label
												key={
													category
												}
												className="flex items-center gap-3 cursor-pointer"
											>
												<input
													type="checkbox"
													checked={selectedCategory.includes(
														category
													)}
													onChange={() =>
														handleCategoryChange(
															category
														)
													}
													className="w-5 h-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
												/>
												<span className="text-sm text-gray-700">
													{
														category
													}
												</span>
											</label>
										)
									)}
								</div>
							</div>

							{/* Price Range */}
							<div>
								<h3 className="text-lg font-bold text-gray-900 mb-4">
									Price
									Range
								</h3>
								<div className="relative">
									<input
										type="range"
										min="0"
										max="500"
										value={
											priceRange
										}
										onChange={(
											e
										) =>
											setPriceRange(
												Number(
													e
														.target
														.value
												)
											)
										}
										className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
									/>
									<div className="flex justify-between text-xs text-gray-500 mt-2">
										<span>
											$0
										</span>
										<span>
											$
											{
												priceRange
											}

											+
										</span>
									</div>
								</div>
							</div>

							{/* Color */}
							<div>
								<h3 className="text-lg font-bold text-gray-900 mb-4">
									Color
								</h3>
								<div className="flex flex-wrap gap-3">
									{colors.map(
										(
											color
										) => (
											<label
												key={
													color.value
												}
												className="cursor-pointer"
											>
												<input
													type="radio"
													name="color"
													value={
														color.value
													}
													checked={
														selectedColor ===
														color.value
													}
													onChange={(
														e
													) =>
														setSelectedColor(
															e
																.target
																.value
														)
													}
													className="sr-only"
												/>
												<div
													className={`w-8 h-8 rounded-full border-2 ${
														color.color
													} ${
														selectedColor ===
														color.value
															? "ring-2 ring-indigo-500 ring-offset-2"
															: "border-gray-300"
													}`}
												></div>
											</label>
										)
									)}
								</div>
							</div>

							{/* Size */}
							<div>
								<h3 className="text-lg font-bold text-gray-900 mb-4">
									Size
								</h3>
								<div className="flex flex-wrap gap-2">
									{sizes.map(
										(
											size
										) => (
											<label
												key={
													size
												}
												className="cursor-pointer"
											>
												<input
													type="radio"
													name="size"
													value={
														size
													}
													checked={
														selectedSize ===
														size
													}
													onChange={(
														e
													) =>
														setSelectedSize(
															e
																.target
																.value
														)
													}
													className="sr-only"
												/>
												<div
													className={`px-4 py-2 text-sm font-medium rounded-lg border transition-colors ${
														selectedSize ===
														size
															? "bg-indigo-600 text-white border-indigo-600"
															: "bg-white text-gray-700 border-gray-300 hover:border-indigo-300"
													}`}
												>
													{
														size
													}
												</div>
											</label>
										)
									)}
								</div>
							</div>
						</div>
					</aside>

					{/* Main Content */}
					<div className="flex-1">
						{/* Mobile Search */}
						<div className="lg:hidden mb-6">
							<div className="relative">
								<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
								<input
									type="text"
									placeholder="Search for products"
									className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
								/>
							</div>
						</div>

						{/* Toolbar */}
						<div className="flex items-center justify-between mb-6">
							<div className="flex items-center gap-4">
								<button className="lg:hidden flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
									<Filter className="w-4 h-4" />
									Filters
								</button>
								<p className="text-sm text-gray-600">
									Showing
									1-8 of
									24
									results
								</p>
							</div>

							<div className="flex items-center gap-4">
								{/* Sort Dropdown */}
								<select
									value={
										sortBy
									}
									onChange={(
										e
									) =>
										setSortBy(
											e
												.target
												.value
										)
									}
									className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
								>
									<option value="featured">
										Featured
									</option>
									<option value="price-low">
										Price:
										Low
										to
										High
									</option>
									<option value="price-high">
										Price:
										High
										to
										Low
									</option>
									<option value="newest">
										Newest
									</option>
								</select>

								{/* View Toggle */}
								<div className="flex border border-gray-300 rounded-lg overflow-hidden">
									<button
										onClick={() =>
											setViewMode(
												"grid"
											)
										}
										className={`p-2 ${
											viewMode ===
											"grid"
												? "bg-indigo-600 text-white"
												: "bg-white text-gray-600 hover:bg-gray-50"
										}`}
									>
										<Grid className="w-4 h-4" />
									</button>
									<button
										onClick={() =>
											setViewMode(
												"list"
											)
										}
										className={`p-2 ${
											viewMode ===
											"list"
												? "bg-indigo-600 text-white"
												: "bg-white text-gray-600 hover:bg-gray-50"
										}`}
									>
										<List className="w-4 h-4" />
									</button>
								</div>
							</div>
						</div>

						{/* Product Grid */}
						<div
							className={`grid gap-6 ${
								viewMode ===
								"grid"
									? "grid-cols-2 md:grid-cols-3 xl:grid-cols-4"
									: "grid-cols-1"
							}`}
						>
							{products.map(
								(product) => (
									<div
										key={
											product.id
										}
										className="group bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-300"
									>
										<div className="relative overflow-hidden">
											<img
												src={
													product.image
												}
												alt={
													product.name
												}
												className="w-full aspect-[3/4] object-cover transition-transform duration-300 group-hover:scale-105"
											/>
											<div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

											{/* Quick Actions */}
											<div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
												<button className="w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-600 hover:text-red-500 transition-colors">
													<Heart className="w-4 h-4" />
												</button>
												<button className="w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-600 hover:text-indigo-600 transition-colors">
													<ShoppingCart className="w-4 h-4" />
												</button>
											</div>
										</div>

										<div className="p-4">
											<h4 className="font-semibold text-gray-900 mb-1">
												{
													product.name
												}
											</h4>
											<p className="text-indigo-600 font-bold">
												$
												{
													product.price
												}
											</p>
											<p className="text-xs text-gray-500 mt-1">
												{
													product.category
												}
											</p>
										</div>
									</div>
								)
							)}
						</div>

						{/* Pagination */}
						<div className="flex items-center justify-center mt-8 gap-2">
							<button className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-indigo-600 transition-colors">
								<ChevronLeft className="w-5 h-5" />
							</button>

							<button className="w-10 h-10 flex items-center justify-center bg-indigo-600 text-white rounded-full font-medium">
								1
							</button>
							<button className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
								2
							</button>
							<button className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
								3
							</button>
							<button className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
								4
							</button>
							<button className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
								5
							</button>

							<button className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-indigo-600 transition-colors">
								<ChevronRight className="w-5 h-5" />
							</button>
						</div>
					</div>
				</div>
			</div>

			{/* Click outside to close dropdown */}
			{isProfileOpen && (
				<div
					className="fixed inset-0 z-40"
					onClick={() => setIsProfileOpen(false)}
				/>
			)}

			<style jsx>{`
				.slider::-webkit-slider-thumb {
					appearance: none;
					height: 20px;
					width: 20px;
					border-radius: 50%;
					background: #4f46e5;
					cursor: pointer;
					border: 2px solid #ffffff;
					box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
				}

				.slider::-moz-range-thumb {
					height: 20px;
					width: 20px;
					border-radius: 50%;
					background: #4f46e5;
					cursor: pointer;
					border: 2px solid #ffffff;
					box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
				}
			`}</style>
		</div>
	);
}

export default ProductListing;
