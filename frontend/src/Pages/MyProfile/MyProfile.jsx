import React, { useState } from "react";
import {
	User,
	Camera,
	CreditCard as Edit3,
	Save,
	X,
	Package,
	Heart,
	Search,
	ShoppingCart,
	ChevronDown,
} from "lucide-react";

function MyProfile({
	onSwitchToLogin,
	onSwitchToSignup,
	onSwitchToCart,
	onSwitchToProducts,
}) {
	const [isProfileOpen, setIsProfileOpen] = useState(false);
	const [isEditing, setIsEditing] = useState(false);
	const [profileData, setProfileData] = useState({
		name: "John Doe",
		email: "john.doe@example.com",
		phone: "+1 (555) 123-4567",
		dateOfBirth: "1990-05-15",
		gender: "Male",
		bio: "Passionate about technology and design. Love shopping for the latest gadgets and fashion.",
	});

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setProfileData((prev) => ({ ...prev, [name]: value }));
	};

	const handleSave = () => {
		setIsEditing(false);
		// Here you would typically save to backend
		console.log("Profile updated:", profileData);
	};

	const handleCancel = () => {
		setIsEditing(false);
		// Reset to original data if needed
	};

	return (
		<div className="min-h-screen bg-gray-50">
			{/* Main Content */}
			<main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
				<div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
					{/* Profile Header */}
					<div className="relative h-32 bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500">
						<div className="absolute inset-0 bg-black/20"></div>
						<div className="absolute -bottom-16 left-8">
							<div className="relative">
								<div className="w-32 h-32 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full border-4 border-white flex items-center justify-center shadow-lg">
									<User className="w-16 h-16 text-white" />
								</div>
								<button className="absolute bottom-2 right-2 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors">
									<Camera className="w-5 h-5 text-gray-600" />
								</button>
							</div>
						</div>
						<div className="absolute top-4 right-4">
							{!isEditing ? (
								<button
									onClick={() =>
										setIsEditing(
											true
										)
									}
									className="flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-sm rounded-lg text-gray-700 hover:bg-white transition-colors"
								>
									<Edit3 className="w-4 h-4" />
									Edit
									Profile
								</button>
							) : (
								<div className="flex gap-2">
									<button
										onClick={
											handleSave
										}
										className="flex items-center gap-2 px-4 py-2 bg-indigo-600 rounded-lg text-white hover:bg-indigo-700 transition-colors"
									>
										<Save className="w-4 h-4" />
										Save
									</button>
									<button
										onClick={
											handleCancel
										}
										className="flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-sm rounded-lg text-gray-700 hover:bg-white transition-colors"
									>
										<X className="w-4 h-4" />
										Cancel
									</button>
								</div>
							)}
						</div>
					</div>

					{/* Profile Content */}
					<div className="pt-20 p-8">
						<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
							{/* Personal Information */}
							<div className="space-y-6">
								<h3 className="text-lg font-semibold text-gray-900">
									Personal
									Information
								</h3>

								<div>
									<label className="block text-sm font-medium text-gray-700 mb-2">
										Full
										Name
									</label>
									{isEditing ? (
										<input
											type="text"
											name="name"
											value={
												profileData.name
											}
											onChange={
												handleInputChange
											}
											className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
										/>
									) : (
										<p className="text-gray-900">
											{
												profileData.name
											}
										</p>
									)}
								</div>

								<div>
									<label className="block text-sm font-medium text-gray-700 mb-2">
										Email
										Address
									</label>
									{isEditing ? (
										<input
											type="email"
											name="email"
											value={
												profileData.email
											}
											onChange={
												handleInputChange
											}
											className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
										/>
									) : (
										<p className="text-gray-900">
											{
												profileData.email
											}
										</p>
									)}
								</div>

								<div>
									<label className="block text-sm font-medium text-gray-700 mb-2">
										Phone
										Number
									</label>
									{isEditing ? (
										<input
											type="tel"
											name="phone"
											value={
												profileData.phone
											}
											onChange={
												handleInputChange
											}
											className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
										/>
									) : (
										<p className="text-gray-900">
											{
												profileData.phone
											}
										</p>
									)}
								</div>
							</div>

							{/* Additional Information */}
							<div className="space-y-6">
								<h3 className="text-lg font-semibold text-gray-900">
									Additional
									Information
								</h3>

								<div>
									<label className="block text-sm font-medium text-gray-700 mb-2">
										Date
										of
										Birth
									</label>
									{isEditing ? (
										<input
											type="date"
											name="dateOfBirth"
											value={
												profileData.dateOfBirth
											}
											onChange={
												handleInputChange
											}
											className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
										/>
									) : (
										<p className="text-gray-900">
											{new Date(
												profileData.dateOfBirth
											).toLocaleDateString()}
										</p>
									)}
								</div>

								<div>
									<label className="block text-sm font-medium text-gray-700 mb-2">
										Gender
									</label>
									{isEditing ? (
										<select
											name="gender"
											value={
												profileData.gender
											}
											onChange={
												handleInputChange
											}
											className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
										>
											<option value="Male">
												Male
											</option>
											<option value="Female">
												Female
											</option>
											<option value="Other">
												Other
											</option>
											<option value="Prefer not to say">
												Prefer
												not
												to
												say
											</option>
										</select>
									) : (
										<p className="text-gray-900">
											{
												profileData.gender
											}
										</p>
									)}
								</div>

								<div>
									<label className="block text-sm font-medium text-gray-700 mb-2">
										Bio
									</label>
									{isEditing ? (
										<textarea
											name="bio"
											value={
												profileData.bio
											}
											onChange={
												handleInputChange
											}
											rows={
												4
											}
											className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
										/>
									) : (
										<p className="text-gray-900">
											{
												profileData.bio
											}
										</p>
									)}
								</div>
							</div>
						</div>

						{/* Account Statistics */}
						<div className="mt-12 pt-8 border-t border-gray-200">
							<h3 className="text-lg font-semibold text-gray-900 mb-6">
								Account
								Statistics
							</h3>
							<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
								<div className="bg-indigo-50 rounded-lg p-6 text-center">
									<div className="text-3xl font-bold text-indigo-600">
										24
									</div>
									<div className="text-sm text-gray-600 mt-1">
										Total
										Orders
									</div>
								</div>
								<div className="bg-purple-50 rounded-lg p-6 text-center">
									<div className="text-3xl font-bold text-purple-600">
										12
									</div>
									<div className="text-sm text-gray-600 mt-1">
										Wishlist
										Items
									</div>
								</div>
								<div className="bg-pink-50 rounded-lg p-6 text-center">
									<div className="text-3xl font-bold text-pink-600">
										$2,450
									</div>
									<div className="text-sm text-gray-600 mt-1">
										Total
										Spent
									</div>
								</div>
							</div>
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

export default MyProfile;
