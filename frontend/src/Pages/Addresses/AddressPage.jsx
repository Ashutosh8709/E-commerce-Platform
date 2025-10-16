import React, { useState } from "react";
import {
	MapPin,
	Search,
	ShoppingCart,
	Heart,
	User,
	ChevronDown,
	Package,
	Plus,
	CreditCard as Edit3,
	Trash2,
	Home,
	Building2,
} from "lucide-react";

function AddressPage() {
	const [isProfileOpen, setIsProfileOpen] = useState(false);
	const [showAddAddress, setShowAddAddress] = useState(false);
	const [editingAddress, setEditingAddress] = useState(null);
	const [addresses, setAddresses] = useState([
		{
			id: 1,
			type: "Home",
			name: "John Doe",
			street: "123 Maple Street",
			city: "Anytown",
			state: "CA",
			zipCode: "12345",
			country: "USA",
			phone: "+1 (555) 123-4567",
			isDefault: true,
		},
		{
			id: 2,
			type: "Work",
			name: "John Doe",
			street: "456 Oak Avenue, Suite 200",
			city: "Anytown",
			state: "CA",
			zipCode: "12346",
			country: "USA",
			phone: "+1 (555) 123-4567",
			isDefault: false,
		},
		{
			id: 3,
			type: "Other",
			name: "Jane Doe",
			street: "789 Pine Lane",
			city: "Otherville",
			state: "NY",
			zipCode: "54321",
			country: "USA",
			phone: "+1 (555) 987-6543",
			isDefault: false,
		},
	]);

	const [newAddress, setNewAddress] = useState({
		type: "Home",
		name: "",
		street: "",
		city: "",
		state: "",
		zipCode: "",
		country: "USA",
		phone: "",
		isDefault: false,
	});

	const handleInputChange = (e) => {
		const { name, value, type, checked } = e.target;
		setNewAddress((prev) => ({
			...prev,
			[name]: type === "checkbox" ? checked : value,
		}));
	};

	const handleAddAddress = (e) => {
		e.preventDefault();
		const id = Math.max(...addresses.map((a) => a.id)) + 1;
		setAddresses((prev) => [...prev, { ...newAddress, id }]);
		setShowAddAddress(false);
		setNewAddress({
			type: "Home",
			name: "",
			street: "",
			city: "",
			state: "",
			zipCode: "",
			country: "USA",
			phone: "",
			isDefault: false,
		});
	};

	const setDefaultAddress = (id) => {
		setAddresses((addresses) =>
			addresses.map((address) => ({
				...address,
				isDefault: address.id === id,
			}))
		);
	};

	const removeAddress = (id) => {
		setAddresses((addresses) =>
			addresses.filter((address) => address.id !== id)
		);
	};

	const getAddressIcon = (type) => {
		switch (type) {
			case "Home":
				return (
					<Home className="w-5 h-5 text-indigo-600" />
				);
			case "Work":
				return (
					<Building2 className="w-5 h-5 text-purple-600" />
				);
			default:
				return (
					<MapPin className="w-5 h-5 text-gray-600" />
				);
		}
	};

	const getAddressColor = (type) => {
		switch (type) {
			case "Home":
				return "bg-indigo-50 text-indigo-700 border-indigo-200";
			case "Work":
				return "bg-purple-50 text-purple-700 border-purple-200";
			default:
				return "bg-gray-50 text-gray-700 border-gray-200";
		}
	};

	return (
		<div className="min-h-screen bg-gray-50">
			{/* Main Content */}
			<main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
				<div className="mb-8">
					<h1 className="text-3xl font-bold text-gray-900">
						My Addresses
					</h1>
					<p className="text-gray-600 mt-2">
						Manage your shipping and billing
						addresses
					</p>
				</div>

				{/* Add New Address Button */}
				<div className="mb-8">
					<button
						onClick={() =>
							setShowAddAddress(true)
						}
						className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium"
					>
						<Plus className="w-5 h-5" />
						Add New Address
					</button>
				</div>

				{/* Addresses List */}
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					{addresses.map((address) => (
						<div
							key={address.id}
							className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
						>
							<div className="flex items-start justify-between mb-4">
								<div className="flex items-center gap-3">
									{getAddressIcon(
										address.type
									)}
									<div>
										<div className="flex items-center gap-2">
											<span className="font-semibold text-gray-900">
												{
													address.type
												}
											</span>
											{address.isDefault && (
												<span className="px-2 py-1 bg-indigo-100 text-indigo-700 text-xs font-medium rounded-full">
													Default
												</span>
											)}
										</div>
										<span className="text-sm text-gray-600">
											{
												address.name
											}
										</span>
									</div>
								</div>

								<div className="flex items-center gap-1">
									<button
										onClick={() =>
											setEditingAddress(
												address.id
											)
										}
										className="p-2 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
									>
										<Edit3 className="w-4 h-4" />
									</button>
									<button
										onClick={() =>
											removeAddress(
												address.id
											)
										}
										className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
									>
										<Trash2 className="w-4 h-4" />
									</button>
								</div>
							</div>

							<div className="text-sm text-gray-600 space-y-1">
								<p>
									{
										address.street
									}
								</p>
								<p>
									{
										address.city
									}
									,{" "}
									{
										address.state
									}{" "}
									{
										address.zipCode
									}
								</p>
								<p>
									{
										address.country
									}
								</p>
								<p className="font-medium">
									{
										address.phone
									}
								</p>
							</div>

							{!address.isDefault && (
								<button
									onClick={() =>
										setDefaultAddress(
											address.id
										)
									}
									className="mt-4 w-full px-4 py-2 text-sm text-indigo-600 border border-indigo-200 rounded-lg hover:bg-indigo-50 transition-colors"
								>
									Set as
									Default
								</button>
							)}
						</div>
					))}
				</div>

				{/* Add New Address Modal */}
				{showAddAddress && (
					<div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
						<div className="bg-white rounded-xl shadow-2xl max-w-lg w-full p-6 max-h-[90vh] overflow-y-auto">
							<h2 className="text-xl font-bold text-gray-900 mb-6">
								Add New Address
							</h2>

							<form
								onSubmit={
									handleAddAddress
								}
								className="space-y-4"
							>
								<div className="grid grid-cols-2 gap-4">
									<div>
										<label className="block text-sm font-medium text-gray-700 mb-2">
											Address
											Type
										</label>
										<select
											name="type"
											value={
												newAddress.type
											}
											onChange={
												handleInputChange
											}
											className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
										>
											<option value="Home">
												Home
											</option>
											<option value="Work">
												Work
											</option>
											<option value="Other">
												Other
											</option>
										</select>
									</div>
									<div>
										<label className="block text-sm font-medium text-gray-700 mb-2">
											Full
											Name
										</label>
										<input
											type="text"
											name="name"
											value={
												newAddress.name
											}
											onChange={
												handleInputChange
											}
											className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
											placeholder="John Doe"
											required
										/>
									</div>
								</div>

								<div>
									<label className="block text-sm font-medium text-gray-700 mb-2">
										Street
										Address
									</label>
									<input
										type="text"
										name="street"
										value={
											newAddress.street
										}
										onChange={
											handleInputChange
										}
										className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
										placeholder="123 Main Street"
										required
									/>
								</div>

								<div className="grid grid-cols-2 gap-4">
									<div>
										<label className="block text-sm font-medium text-gray-700 mb-2">
											City
										</label>
										<input
											type="text"
											name="city"
											value={
												newAddress.city
											}
											onChange={
												handleInputChange
											}
											className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
											placeholder="Anytown"
											required
										/>
									</div>
									<div>
										<label className="block text-sm font-medium text-gray-700 mb-2">
											State
										</label>
										<input
											type="text"
											name="state"
											value={
												newAddress.state
											}
											onChange={
												handleInputChange
											}
											className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
											placeholder="CA"
											required
										/>
									</div>
								</div>

								<div className="grid grid-cols-2 gap-4">
									<div>
										<label className="block text-sm font-medium text-gray-700 mb-2">
											ZIP
											Code
										</label>
										<input
											type="text"
											name="zipCode"
											value={
												newAddress.zipCode
											}
											onChange={
												handleInputChange
											}
											className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
											placeholder="12345"
											required
										/>
									</div>
									<div>
										<label className="block text-sm font-medium text-gray-700 mb-2">
											Country
										</label>
										<select
											name="country"
											value={
												newAddress.country
											}
											onChange={
												handleInputChange
											}
											className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
										>
											<option value="USA">
												United
												States
											</option>
											<option value="Canada">
												Canada
											</option>
											<option value="UK">
												United
												Kingdom
											</option>
											<option value="Australia">
												Australia
											</option>
										</select>
									</div>
								</div>

								<div>
									<label className="block text-sm font-medium text-gray-700 mb-2">
										Phone
										Number
									</label>
									<input
										type="tel"
										name="phone"
										value={
											newAddress.phone
										}
										onChange={
											handleInputChange
										}
										className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
										placeholder="+1 (555) 123-4567"
										required
									/>
								</div>

								<div className="flex items-center">
									<input
										type="checkbox"
										name="isDefault"
										checked={
											newAddress.isDefault
										}
										onChange={
											handleInputChange
										}
										className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
									/>
									<label className="ml-2 text-sm text-gray-700">
										Set
										as
										default
										address
									</label>
								</div>

								<div className="flex gap-3 pt-4">
									<button
										type="submit"
										className="flex-1 bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors font-medium"
									>
										Add
										Address
									</button>
									<button
										type="button"
										onClick={() =>
											setShowAddAddress(
												false
											)
										}
										className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors font-medium"
									>
										Cancel
									</button>
								</div>
							</form>
						</div>
					</div>
				)}

				{addresses.length === 0 && (
					<div className="text-center py-12">
						<MapPin className="w-16 h-16 text-gray-300 mx-auto mb-4" />
						<h3 className="text-lg font-medium text-gray-900 mb-2">
							No addresses saved
						</h3>
						<p className="text-gray-500 mb-6">
							Add an address to make
							checkout faster and
							easier.
						</p>
						<button
							onClick={() =>
								setShowAddAddress(
									true
								)
							}
							className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors"
						>
							Add Your First Address
						</button>
					</div>
				)}
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

export default AddressPage;
