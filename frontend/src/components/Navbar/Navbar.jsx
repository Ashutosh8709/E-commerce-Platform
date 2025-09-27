import React from "react";
import { useState } from "react";
import { Search, ShoppingCart, Package, Menu, X } from "lucide-react";
import { Link, NavLink } from "react-router-dom";

function Navbar() {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	return (
		<header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex items-center justify-between h-16">
					{/* Logo */}
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
						<a
							href="#"
							className="text-gray-700 hover:text-indigo-600 font-medium transition-colors"
						>
							Home
						</a>
						<a
							href="#"
							className="text-gray-700 hover:text-indigo-600 font-medium transition-colors"
						>
							Categories
						</a>
						<a
							href="#"
							className="text-gray-700 hover:text-indigo-600 font-medium transition-colors"
						>
							Deals
						</a>
						<a
							href="#"
							className="text-gray-700 hover:text-indigo-600 font-medium transition-colors"
						>
							New Arrivals
						</a>
					</nav>

					{/* Right Side */}
					<div className="flex items-center gap-4">
						{/* Search Bar */}
						<div className="hidden sm:flex relative">
							<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
							<input
								type="text"
								placeholder="Search"
								className="pl-10 pr-4 py-2 w-64 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
							/>
						</div>

						{/* Auth Buttons */}
						<div className="hidden lg:flex items-center gap-3">
							<Link
								className="px-4 py-2 text-indigo-600 hover:text-indigo-700 font-medium transition-colors"
								to={"/login"}
							>
								Login
							</Link>
							<Link
								className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium transition-colors"
								to={"/signup"}
							>
								Register
							</Link>
						</div>

						{/* Cart */}
						<button className="relative p-2 text-gray-700 hover:text-indigo-600 transition-colors">
							<ShoppingCart className="w-6 h-6" />
							<span className="absolute -top-1 -right-1 w-5 h-5 bg-indigo-600 text-white text-xs rounded-full flex items-center justify-center">
								3
							</span>
						</button>

						{/* Mobile Menu Button */}
						<button
							onClick={() =>
								setIsMenuOpen(
									!isMenuOpen
								)
							}
							className="md:hidden p-2 text-gray-700"
						>
							{isMenuOpen ? (
								<X className="w-6 h-6" />
							) : (
								<Menu className="w-6 h-6" />
							)}
						</button>
					</div>
				</div>

				{/* Mobile Menu */}
				{isMenuOpen && (
					<div className="md:hidden py-4 border-t border-gray-200">
						<div className="flex flex-col gap-4">
							<a
								href="#"
								className="text-gray-700 hover:text-indigo-600 font-medium"
							>
								Home
							</a>
							<a
								href="#"
								className="text-gray-700 hover:text-indigo-600 font-medium"
							>
								Categories
							</a>
							<a
								href="#"
								className="text-gray-700 hover:text-indigo-600 font-medium"
							>
								Deals
							</a>
							<a
								href="#"
								className="text-gray-700 hover:text-indigo-600 font-medium"
							>
								New Arrivals
							</a>
							<div className="flex gap-3 pt-4 border-t border-gray-200">
								<button className="px-4 py-2 text-indigo-600 border border-indigo-600 rounded-lg font-medium">
									Login
								</button>
								<button className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium">
									Register
								</button>
							</div>
						</div>
					</div>
				)}
			</div>
		</header>
	);
}

export default Navbar;
