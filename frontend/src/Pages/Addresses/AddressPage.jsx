import React, { useState } from "react";
import { MapPin, Plus, Pencil, Trash2, Home, Building2 } from "lucide-react";
import { useAddress } from "../../hooks/useAddressQuery";

function AddressPage() {
	const [showModal, setShowModal] = useState(false);
	const [editingAddress, setEditingAddress] = useState(null);

	const {
		addresses = [],
		loading,
		addAddress,
		updateAddress,
		removeAddress,
		markAsDefault,
	} = useAddress();

	const [formData, setFormData] = useState({
		label: "Home",
		name: "",
		street: "",
		city: "",
		state: "",
		postalCode: "",
		country: "India",
		phone: "",
		isDefault: false,
	});

	const handleInputChange = (e) => {
		const { name, value, type, checked } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: type === "checkbox" ? checked : value,
		}));
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		if (editingAddress) {
			updateAddress(
				{
					addressId: editingAddress._id,
					data: formData,
				},
				{
					onSuccess: () => {
						setShowModal(false);
						setEditingAddress(null);
						resetForm();
					},
				}
			);
		} else {
			addAddress(formData, {
				onSuccess: () => {
					setShowModal(false);
					resetForm();
				},
			});
		}
	};

	const resetForm = () =>
		setFormData({
			label: "Home",
			name: "",
			street: "",
			city: "",
			state: "",
			postalCode: "",
			country: "India",
			phone: "",
			isDefault: false,
		});

	const openEditModal = (address) => {
		setEditingAddress(address);
		setFormData({
			label: address.label || "Home",
			name: address.name,
			street: address.street,
			city: address.city,
			state: address.state,
			postalCode: address.postalCode,
			country: address.country || "India",
			phone: address.phone,
			isDefault: address.isDefault,
		});
		setShowModal(true);
	};

	const handleDelete = (id) => removeAddress(id);
	const handleSetDefault = (id) => markAsDefault(id);

	const getAddressIcon = (label) => {
		switch (label) {
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

	if (loading)
		return (
			<div className="flex justify-center items-center min-h-screen">
				<p className="text-gray-500 animate-pulse">
					Loading your addresses...
				</p>
			</div>
		);

	return (
		<div className="min-h-screen bg-gray-50">
			<main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
				{/* Header */}
				<div className="mb-8">
					<h1 className="text-3xl font-bold text-gray-900">
						My Addresses
					</h1>
					<p className="text-gray-600 mt-2">
						Manage your shipping and billing
						addresses
					</p>
				</div>

				{/* Add New Address */}
				<div className="mb-8">
					<button
						onClick={() => {
							resetForm();
							setEditingAddress(null);
							setShowModal(true);
						}}
						className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium"
					>
						<Plus className="w-5 h-5" />
						Add New Address
					</button>
				</div>

				{/* Address Cards */}
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					{addresses.length > 0 ? (
						addresses.map((address) => (
							<div
								key={
									address._id
								}
								className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
							>
								<div className="flex items-start justify-between mb-4">
									<div className="flex items-center gap-3">
										{getAddressIcon(
											address.label
										)}
										<div>
											<div className="flex items-center gap-2">
												<span className="font-semibold text-gray-900">
													{
														address.label
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
												openEditModal(
													address
												)
											}
											className="p-2 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
										>
											<Pencil className="w-4 h-4" />
										</button>
										<button
											onClick={() =>
												handleDelete(
													address._id
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
											address.postalCode
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
											handleSetDefault(
												address._id
											)
										}
										className="mt-4 w-full px-4 py-2 text-sm text-indigo-600 border border-indigo-200 rounded-lg hover:bg-indigo-50 transition-colors"
									>
										Set
										as
										Default
									</button>
								)}
							</div>
						))
					) : (
						<div className="text-center col-span-2 py-12">
							<MapPin className="w-16 h-16 text-gray-300 mx-auto mb-4" />
							<h3 className="text-lg font-medium text-gray-900 mb-2">
								No addresses
								saved
							</h3>
							<p className="text-gray-500 mb-6">
								Add an address
								to make checkout
								faster.
							</p>
							<button
								onClick={() =>
									setShowModal(
										true
									)
								}
								className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors"
							>
								Add Your First
								Address
							</button>
						</div>
					)}
				</div>

				{/* Add / Edit Address Modal */}
				{showModal && (
					<div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
						<div className="bg-white rounded-xl shadow-2xl max-w-lg w-full p-6 max-h-[90vh] overflow-y-auto">
							<h2 className="text-xl font-bold text-gray-900 mb-6">
								{editingAddress
									? "Edit Address"
									: "Add New Address"}
							</h2>

							<form
								onSubmit={
									handleSubmit
								}
								className="space-y-4"
							>
								{/* Input Fields */}
								<div className="grid grid-cols-2 gap-4">
									<select
										name="label"
										value={
											formData.label
										}
										onChange={
											handleInputChange
										}
										className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
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
									<input
										type="text"
										name="name"
										value={
											formData.name
										}
										onChange={
											handleInputChange
										}
										placeholder="Full Name"
										className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
										required
									/>
								</div>

								<input
									type="text"
									name="street"
									value={
										formData.street
									}
									onChange={
										handleInputChange
									}
									placeholder="Street Address"
									className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
									required
								/>

								<div className="grid grid-cols-2 gap-4">
									<input
										type="text"
										name="city"
										value={
											formData.city
										}
										onChange={
											handleInputChange
										}
										placeholder="City"
										className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
										required
									/>
									<input
										type="text"
										name="state"
										value={
											formData.state
										}
										onChange={
											handleInputChange
										}
										placeholder="State"
										className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
										required
									/>
								</div>

								<div className="grid grid-cols-2 gap-4">
									<input
										type="text"
										name="postalCode"
										value={
											formData.postalCode
										}
										onChange={
											handleInputChange
										}
										placeholder="Postal Code"
										className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
										required
									/>
									<input
										type="tel"
										name="phone"
										value={
											formData.phone
										}
										onChange={
											handleInputChange
										}
										placeholder="Phone"
										className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
										required
									/>
								</div>

								<div className="flex items-center">
									<input
										type="checkbox"
										name="isDefault"
										checked={
											formData.isDefault
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
										{editingAddress
											? "Update"
											: "Add"}
									</button>
									<button
										type="button"
										onClick={() => {
											setShowModal(
												false
											);
											setEditingAddress(
												null
											);
										}}
										className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors font-medium"
									>
										Cancel
									</button>
								</div>
							</form>
						</div>
					</div>
				)}
			</main>
		</div>
	);
}

export default AddressPage;
