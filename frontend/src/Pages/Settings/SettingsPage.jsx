import React, { useState } from "react";
import {
	Settings,
	Search,
	ShoppingCart,
	Heart,
	User,
	ChevronDown,
	Package,
	Bell,
	Shield,
	Globe,
	Moon,
	Sun,
	Monitor,
} from "lucide-react";

function SettingsPage({
	onSwitchToLogin,
	onSwitchToSignup,
	onSwitchToCart,
	onSwitchToProducts,
}) {
	const [isProfileOpen, setIsProfileOpen] = useState(false);
	const [settings, setSettings] = useState({
		notifications: {
			orderUpdates: true,
			promotions: false,
			newsletter: true,
			sms: false,
		},
		privacy: {
			profileVisibility: "private",
			dataSharing: false,
			analytics: true,
		},
		preferences: {
			language: "en",
			currency: "USD",
			theme: "system",
		},
	});

	const handleNotificationChange = (key, value) => {
		setSettings((prev) => ({
			...prev,
			notifications: {
				...prev.notifications,
				[key]: value,
			},
		}));
	};

	const handlePrivacyChange = (key, value) => {
		setSettings((prev) => ({
			...prev,
			privacy: {
				...prev.privacy,
				[key]: value,
			},
		}));
	};

	const handlePreferenceChange = (key, value) => {
		setSettings((prev) => ({
			...prev,
			preferences: {
				...prev.preferences,
				[key]: value,
			},
		}));
	};

	const getThemeIcon = (theme) => {
		switch (theme) {
			case "light":
				return <Sun className="w-4 h-4" />;
			case "dark":
				return <Moon className="w-4 h-4" />;
			default:
				return <Monitor className="w-4 h-4" />;
		}
	};

	return (
		<div className="min-h-screen bg-gray-50">
			{/* Main Content */}
			<main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
				<div className="mb-8">
					<h1 className="text-3xl font-bold text-gray-900">
						Settings
					</h1>
					<p className="text-gray-600 mt-2">
						Manage your account preferences
						and privacy settings
					</p>
				</div>

				<div className="space-y-8">
					{/* Notifications */}
					<div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
						<div className="flex items-center gap-3 mb-6">
							<Bell className="w-6 h-6 text-indigo-600" />
							<h2 className="text-xl font-semibold text-gray-900">
								Notifications
							</h2>
						</div>

						<div className="space-y-4">
							<div className="flex items-center justify-between">
								<div>
									<h3 className="font-medium text-gray-900">
										Order
										Updates
									</h3>
									<p className="text-sm text-gray-500">
										Get
										notified
										about
										your
										order
										status
									</p>
								</div>
								<label className="relative inline-flex items-center cursor-pointer">
									<input
										type="checkbox"
										checked={
											settings
												.notifications
												.orderUpdates
										}
										onChange={(
											e
										) =>
											handleNotificationChange(
												"orderUpdates",
												e
													.target
													.checked
											)
										}
										className="sr-only peer"
									/>
									<div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
								</label>
							</div>

							<div className="flex items-center justify-between">
								<div>
									<h3 className="font-medium text-gray-900">
										Promotions
										&
										Deals
									</h3>
									<p className="text-sm text-gray-500">
										Receive
										special
										offers
										and
										discounts
									</p>
								</div>
								<label className="relative inline-flex items-center cursor-pointer">
									<input
										type="checkbox"
										checked={
											settings
												.notifications
												.promotions
										}
										onChange={(
											e
										) =>
											handleNotificationChange(
												"promotions",
												e
													.target
													.checked
											)
										}
										className="sr-only peer"
									/>
									<div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
								</label>
							</div>

							<div className="flex items-center justify-between">
								<div>
									<h3 className="font-medium text-gray-900">
										Newsletter
									</h3>
									<p className="text-sm text-gray-500">
										Weekly
										newsletter
										with
										trends
										and
										tips
									</p>
								</div>
								<label className="relative inline-flex items-center cursor-pointer">
									<input
										type="checkbox"
										checked={
											settings
												.notifications
												.newsletter
										}
										onChange={(
											e
										) =>
											handleNotificationChange(
												"newsletter",
												e
													.target
													.checked
											)
										}
										className="sr-only peer"
									/>
									<div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
								</label>
							</div>

							<div className="flex items-center justify-between">
								<div>
									<h3 className="font-medium text-gray-900">
										SMS
										Notifications
									</h3>
									<p className="text-sm text-gray-500">
										Receive
										text
										messages
										for
										urgent
										updates
									</p>
								</div>
								<label className="relative inline-flex items-center cursor-pointer">
									<input
										type="checkbox"
										checked={
											settings
												.notifications
												.sms
										}
										onChange={(
											e
										) =>
											handleNotificationChange(
												"sms",
												e
													.target
													.checked
											)
										}
										className="sr-only peer"
									/>
									<div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
								</label>
							</div>
						</div>
					</div>

					{/* Privacy & Security */}
					<div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
						<div className="flex items-center gap-3 mb-6">
							<Shield className="w-6 h-6 text-indigo-600" />
							<h2 className="text-xl font-semibold text-gray-900">
								Privacy &
								Security
							</h2>
						</div>

						<div className="space-y-4">
							<div className="flex items-center justify-between">
								<div>
									<h3 className="font-medium text-gray-900">
										Profile
										Visibility
									</h3>
									<p className="text-sm text-gray-500">
										Control
										who
										can
										see
										your
										profile
										information
									</p>
								</div>
								<select
									value={
										settings
											.privacy
											.profileVisibility
									}
									onChange={(
										e
									) =>
										handlePrivacyChange(
											"profileVisibility",
											e
												.target
												.value
										)
									}
									className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
								>
									<option value="public">
										Public
									</option>
									<option value="private">
										Private
									</option>
									<option value="friends">
										Friends
										Only
									</option>
								</select>
							</div>

							<div className="flex items-center justify-between">
								<div>
									<h3 className="font-medium text-gray-900">
										Data
										Sharing
									</h3>
									<p className="text-sm text-gray-500">
										Share
										anonymized
										data
										to
										improve
										our
										services
									</p>
								</div>
								<label className="relative inline-flex items-center cursor-pointer">
									<input
										type="checkbox"
										checked={
											settings
												.privacy
												.dataSharing
										}
										onChange={(
											e
										) =>
											handlePrivacyChange(
												"dataSharing",
												e
													.target
													.checked
											)
										}
										className="sr-only peer"
									/>
									<div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
								</label>
							</div>

							<div className="flex items-center justify-between">
								<div>
									<h3 className="font-medium text-gray-900">
										Analytics
									</h3>
									<p className="text-sm text-gray-500">
										Help
										us
										improve
										by
										sharing
										usage
										analytics
									</p>
								</div>
								<label className="relative inline-flex items-center cursor-pointer">
									<input
										type="checkbox"
										checked={
											settings
												.privacy
												.analytics
										}
										onChange={(
											e
										) =>
											handlePrivacyChange(
												"analytics",
												e
													.target
													.checked
											)
										}
										className="sr-only peer"
									/>
									<div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
								</label>
							</div>
						</div>
					</div>

					{/* Preferences */}
					<div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
						<div className="flex items-center gap-3 mb-6">
							<Globe className="w-6 h-6 text-indigo-600" />
							<h2 className="text-xl font-semibold text-gray-900">
								Preferences
							</h2>
						</div>

						<div className="space-y-4">
							<div className="flex items-center justify-between">
								<div>
									<h3 className="font-medium text-gray-900">
										Language
									</h3>
									<p className="text-sm text-gray-500">
										Choose
										your
										preferred
										language
									</p>
								</div>
								<select
									value={
										settings
											.preferences
											.language
									}
									onChange={(
										e
									) =>
										handlePreferenceChange(
											"language",
											e
												.target
												.value
										)
									}
									className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
								>
									<option value="en">
										English
									</option>
									<option value="es">
										Español
									</option>
									<option value="fr">
										Français
									</option>
									<option value="de">
										Deutsch
									</option>
									<option value="it">
										Italiano
									</option>
								</select>
							</div>

							<div className="flex items-center justify-between">
								<div>
									<h3 className="font-medium text-gray-900">
										Currency
									</h3>
									<p className="text-sm text-gray-500">
										Display
										prices
										in
										your
										preferred
										currency
									</p>
								</div>
								<select
									value={
										settings
											.preferences
											.currency
									}
									onChange={(
										e
									) =>
										handlePreferenceChange(
											"currency",
											e
												.target
												.value
										)
									}
									className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
								>
									<option value="USD">
										USD
										($)
									</option>
									<option value="EUR">
										EUR
										(€)
									</option>
									<option value="GBP">
										GBP
										(£)
									</option>
									<option value="CAD">
										CAD
										($)
									</option>
									<option value="AUD">
										AUD
										($)
									</option>
								</select>
							</div>

							<div className="flex items-center justify-between">
								<div>
									<h3 className="font-medium text-gray-900">
										Theme
									</h3>
									<p className="text-sm text-gray-500">
										Choose
										your
										preferred
										color
										scheme
									</p>
								</div>
								<div className="flex items-center gap-2">
									{[
										"light",
										"dark",
										"system",
									].map(
										(
											theme
										) => (
											<button
												key={
													theme
												}
												onClick={() =>
													handlePreferenceChange(
														"theme",
														theme
													)
												}
												className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
													settings
														.preferences
														.theme ===
													theme
														? "bg-indigo-100 text-indigo-700"
														: "bg-gray-100 text-gray-700 hover:bg-gray-200"
												}`}
											>
												{getThemeIcon(
													theme
												)}
												{theme
													.charAt(
														0
													)
													.toUpperCase() +
													theme.slice(
														1
													)}
											</button>
										)
									)}
								</div>
							</div>
						</div>
					</div>

					{/* Account Actions */}
					<div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
						<h2 className="text-xl font-semibold text-gray-900 mb-6">
							Account Actions
						</h2>

						<div className="space-y-4">
							<button className="w-full text-left px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
								<h3 className="font-medium text-gray-900">
									Download
									My Data
								</h3>
								<p className="text-sm text-gray-500">
									Get a
									copy of
									all your
									account
									data
								</p>
							</button>

							<button className="w-full text-left px-4 py-3 border border-red-300 rounded-lg hover:bg-red-50 transition-colors">
								<h3 className="font-medium text-red-600">
									Delete
									Account
								</h3>
								<p className="text-sm text-red-500">
									Permanently
									delete
									your
									account
									and all
									data
								</p>
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

export default SettingsPage;
