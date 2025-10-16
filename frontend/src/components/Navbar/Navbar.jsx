import React from "react";
import { useState } from "react";
import {
	Search,
	ShoppingCart,
	Package,
	Menu,
	X,
	Heart,
	User,
	ChevronDown,
	ShoppingBag,
	CreditCard,
	LogOut,
	MapPin,
	Settings,
	HelpCircle,
} from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Navbar() {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [isProfileOpen, setIsProfileOpen] = useState(false);
	const { user, logout } = useAuth();
	const navigate = useNavigate();

	const handleLogout = async () => {
		await logout();
	};

	return (
		<header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200 shadow-sm">
			<div className="max-w-full px-4 sm:px-6 lg:px-8">
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
							<NavLink
								to="/home"
								className={({
									isActive,
								}) =>
									`block py-2 pr-4 pl-3 duration-200 ${
										isActive
											? "text-indigo-600"
											: "text-gray-700"
									} 
								
								"text-md
								font-medium
								text-gray-700
								hover:text-indigo-600
								transition-colors`
								}
							>
								{" "}
								Home
							</NavLink>
							<Link
								to="/products	"
								className="text-md font-medium text-gray-700 hover:text-indigo-600 transition-colors"
							>
								Shop
							</Link>
							<Link
								href="#"
								className="text-md font-medium text-gray-700 hover:text-indigo-600 transition-colors"
							>
								Deals
							</Link>
							<Link
								href="#"
								className="text-md font-medium text-gray-700 hover:text-indigo-600 transition-colors"
							>
								New Arrivals
							</Link>
						</nav>
					</div>

					{/* Right Side */}
					<div className="flex items-center gap-4">
						{user ? (
							<>
								{/* Search Bar */}
								<div className="hidden sm:flex relative">
									<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
									<input
										type="text"
										placeholder="Search"
										className="pl-10 pr-4 py-2 w-64 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-gray-50"
									/>
								</div>

								{/* Action Buttons */}
								<div className="flex items-center gap-2">
									<button className="p-2 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-full transition-colors">
										<Heart className="w-5 h-5" />
									</button>

									<NavLink
										to="/cart"
										className={({
											isActive,
										}) =>
											`block py-2 pr-4 pl-3 duration-200 ${
												isActive
													? "text-indigo-600 bg-indigo-50"
													: "text-gray-700"
											} 
										relative p-2 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-full transition-colors`
										}
									>
										<ShoppingCart className="w-5 h-5" />
										<span className="absolute -top-1 -right-1 w-5 h-5 bg-indigo-600 text-white text-xs rounded-full flex items-center justify-center">
											3
										</span>
									</NavLink>

									{/* Profile Dropdown */}
									<div className="relative">
										<button
											onClick={() =>
												setIsProfileOpen(
													!isProfileOpen
												)
											}
											className="flex items-center gap-2 p-2 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-full transition-colors"
										>
											<div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center border-2 border-indigo-200">
												<User className="w-4 h-4 text-white" />
											</div>
											<ChevronDown
												className={`w-4 h-4 transition-transform ${
													isProfileOpen
														? "rotate-180"
														: ""
												}`}
											/>
										</button>

										{/* Dropdown Menu */}
										{isProfileOpen && (
											<div className="absolute right-0 mt-2 w-64 bg-white/95 backdrop-blur-md rounded-xl shadow-2xl border border-gray-200/50 py-2 z-50">
												{/* User Info */}
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

												{/* Menu Items */}
												<div className="py-2">
													<button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors">
														<User className="w-4 h-4" />
														My
														Profile
													</button>

													<button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors">
														<ShoppingBag className="w-4 h-4" />
														My
														Orders
													</button>

													<button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors">
														<Heart className="w-4 h-4" />
														Wishlist
													</button>

													<button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors">
														<CreditCard className="w-4 h-4" />
														Payment
														Methods
													</button>

													<button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors">
														<MapPin className="w-4 h-4" />
														Addresses
													</button>

													<button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors">
														<Settings className="w-4 h-4" />
														Settings
													</button>

													<button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors">
														<HelpCircle className="w-4 h-4" />
														Help
														&
														Support
													</button>
												</div>

												{/* Sign Out */}
												<div className="border-t border-gray-100 pt-2">
													<button
														onClick={
															handleLogout
														}
														className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
													>
														<LogOut className="w-4 h-4" />
														Sign
														Out
													</button>
												</div>
											</div>
										)}
									</div>
								</div>
							</>
						) : (
							<>
								<div className="hidden lg:flex items-center gap-3">
									<Link
										className="px-4 py-2 text-indigo-600 hover:text-indigo-700 font-medium transition-colors"
										to={
											"/login"
										}
									>
										Login
									</Link>
									<Link
										className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium transition-colors"
										to={
											"/signup"
										}
									>
										Register
									</Link>
								</div>
							</>
						)}

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
								Shop
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
								Services
							</a>
						</div>
					</div>
				)}
			</div>
		</header>
	);
}

export default Navbar;
