import React, { useState } from "react";
import { Mail, Lock, Eye, EyeOff, Check, X, KeyRound } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";

function ForgotPassword() {
	const [formData, setFormData] = useState({
		email: "",
		newPassword: "",
		confirmPassword: "",
	});
	const [showNewPassword, setShowNewPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const [step, setStep] = useState("email");
	const { forgotPassword, verifyUser } = useAuth();

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleEmailSubmit = async (e) => {
		e.preventDefault();
		const ok = await verifyUser(formData);
		if (ok) {
			setStep("reset");
		}
	};

	const handlePasswordReset = (e) => {
		e.preventDefault();
		forgotPassword(formData);
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 flex items-center justify-center p-4 relative overflow-hidden">
			{/* Animated background elements */}
			<div className="absolute inset-0 overflow-hidden">
				<div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
				<div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
				<div className="absolute top-40 left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
			</div>

			{/* Main forgot password form */}
			<div className="relative z-10 w-full max-w-md">
				<div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl p-8 border border-white/20">
					{/* Header */}
					<div className="text-center mb-8">
						<div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
							<KeyRound className="w-8 h-8 text-white" />
						</div>
						<h1 className="text-3xl font-bold text-white mb-2">
							{step === "email"
								? "Reset Password"
								: "Create New Password"}
						</h1>
						<p className="text-gray-300">
							{step === "email"
								? "Enter your email to receive reset instructions"
								: "Enter your new password below"}
						</p>
					</div>

					{step === "email" ? (
						<form
							onSubmit={
								handleEmailSubmit
							}
							className="space-y-6"
						>
							{/* Email Field */}
							<div>
								<div className="relative">
									<Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-300" />
									<input
										type="email"
										name="email"
										placeholder="Email Address"
										value={
											formData.email
										}
										onChange={
											handleInputChange
										}
										className="w-full pl-12 pr-4 py-3 bg-white/10 backdrop-blur-sm border rounded-xl text-white placeholder-gray-300 transition-all duration-300 focus:outline-none focus:ring-2 border-white/20 hover:border-white/30 focus:border-indigo-400 focus:ring-indigo-400/50"
									/>
								</div>
							</div>

							{/* Submit Button */}
							<button
								type="submit"
								className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold py-3 px-6 rounded-xl hover:from-indigo-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-opacity-50 transform transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl"
							>
								Send Reset
								Instructions
							</button>
						</form>
					) : (
						<form
							onSubmit={
								handlePasswordReset
							}
							className="space-y-6"
						>
							{/* New Password Field */}
							<div>
								<div className="relative">
									<Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-300" />
									<input
										type={
											showNewPassword
												? "text"
												: "password"
										}
										name="newPassword"
										placeholder="New Password"
										value={
											formData.newPassword
										}
										onChange={
											handleInputChange
										}
										className="w-full pl-12 pr-4 py-3 bg-white/10 backdrop-blur-sm border rounded-xl text-white placeholder-gray-300 transition-all duration-300 focus:outline-none focus:ring-2 border-white/20 hover:border-white/30 focus:border-indigo-400 focus:ring-indigo-400/50"
									/>
									<button
										type="button"
										onClick={() =>
											setShowNewPassword(
												!showNewPassword
											)
										}
										className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-300 hover:text-white transition-colors duration-200"
									>
										{showNewPassword ? (
											<EyeOff className="w-5 h-5" />
										) : (
											<Eye className="w-5 h-5" />
										)}
									</button>
								</div>
							</div>

							{/* Confirm Password Field */}
							<div>
								<div className="relative">
									<Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-300" />
									<input
										type={
											showConfirmPassword
												? "text"
												: "password"
										}
										name="confirmPassword"
										placeholder="Confirm New Password"
										value={
											formData.confirmPassword
										}
										onChange={
											handleInputChange
										}
										className="w-full pl-12 pr-4 py-3 bg-white/10 backdrop-blur-sm border rounded-xl text-white placeholder-gray-300 transition-all duration-300 focus:outline-none focus:ring-2 border-white/20 hover:border-white/30 focus:border-indigo-400 focus:ring-indigo-400/50"
									/>
									<button
										type="button"
										onClick={() =>
											setShowConfirmPassword(
												!showConfirmPassword
											)
										}
										className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-300 hover:text-white transition-colors duration-200"
									>
										{showConfirmPassword ? (
											<EyeOff className="w-5 h-5" />
										) : (
											<Eye className="w-5 h-5" />
										)}
									</button>
								</div>
							</div>

							{/* Password Requirements */}
							<div className="bg-white/5 rounded-lg p-4 border border-white/10">
								<p className="text-sm text-gray-300 mb-2">
									Password
									requirements:
								</p>
								<ul className="text-xs text-gray-400 space-y-1">
									<li className="flex items-center">
										<div
											className={`w-2 h-2 rounded-full mr-2 ${
												formData
													.newPassword
													.length >=
												8
													? "bg-green-400"
													: "bg-gray-500"
											}`}
										></div>
										At
										least
										8
										characters
									</li>
									<li className="flex items-center">
										<div
											className={`w-2 h-2 rounded-full mr-2 ${
												/[A-Z]/.test(
													formData.newPassword
												)
													? "bg-green-400"
													: "bg-gray-500"
											}`}
										></div>
										One
										uppercase
										letter
									</li>
									<li className="flex items-center">
										<div
											className={`w-2 h-2 rounded-full mr-2 ${
												/[0-9]/.test(
													formData.newPassword
												)
													? "bg-green-400"
													: "bg-gray-500"
											}`}
										></div>
										One
										number
									</li>
								</ul>
							</div>

							{/* Submit Button */}
							<button
								type="submit"
								className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold py-3 px-6 rounded-xl hover:from-indigo-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-opacity-50 transform transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl"
							>
								Reset Password
							</button>
						</form>
					)}

					{/* Footer */}
					<div className="text-center mt-6 pt-6 border-t border-white/10">
						<p className="text-gray-300">
							Remember your password?{" "}
							<Link
								to={"/login"}
								className="text-indigo-400 hover:text-indigo-300 font-medium transition-colors duration-200"
							>
								Back to Sign In
							</Link>
						</p>
					</div>
				</div>
			</div>

			<style jsx>{`
				@keyframes blob {
					0% {
						transform: translate(0px, 0px)
							scale(1);
					}
					33% {
						transform: translate(
								30px,
								-50px
							)
							scale(1.1);
					}
					66% {
						transform: translate(
								-20px,
								20px
							)
							scale(0.9);
					}
					100% {
						transform: translate(0px, 0px)
							scale(1);
					}
				}
				.animate-blob {
					animation: blob 7s infinite;
				}
				.animation-delay-2000 {
					animation-delay: 2s;
				}
				.animation-delay-4000 {
					animation-delay: 4s;
				}
			`}</style>
		</div>
	);
}

export default ForgotPassword;
