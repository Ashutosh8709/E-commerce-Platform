import React, { useState } from "react";
import { Upload, User, Mail, Lock, Eye, EyeOff, Check, X } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

function Signup() {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		password: "",
		confirmPassword: "",
		avatar: null,
	});
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const [avatarPreview, setAvatarPreview] = useState("");

	const { signup } = useAuth;

	const handleSubmit = (e) => {
		e.preventDefault();
		signup(formData);
	};

	const handleInputChange = (e) => {
		setFormData((prev) => ({
			...prev,
			[e.target.name]: e.target.value,
		}));
	};

	const handleImageUpload = (e) => {
		setFormData((prev) => ({
			...prev,
			avatar: e.target.files[0],
		}));
		setAvatarPreview(URL.createObjectURL(e.target.files[0]));
	};
	return (
		<div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 flex items-center justify-center p-4 relative overflow-hidden">
			{/* Animated background elements */}
			<div className="absolute inset-0 overflow-hidden">
				<div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
				<div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
				<div className="absolute top-40 left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
			</div>

			{/* Main signup form */}
			<div className="relative z-10 w-full max-w-md">
				<div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl p-8 border border-white/20">
					{/* Header */}
					<div className="text-center mb-8">
						<h1 className="text-3xl font-bold text-white mb-2">
							Create Account
						</h1>
						<p className="text-gray-300">
							Join us and start your
							journey
						</p>
					</div>

					{/* Profile Picture Upload */}
					<div className="flex justify-center mb-8">
						<div className="relative">
							<div className="w-24 h-24 rounded-full bg-white/10 border-2 border-dashed border-white/30 flex items-center justify-center overflow-hidden transition-all duration-300 hover:border-white/50 hover:bg-white/20">
								{formData.avatar ? (
									<img
										src={
											avatarPreview
										}
										alt="Profile"
										className="w-full h-full object-cover rounded-full"
									/>
								) : (
									<Upload className="w-8 h-8 text-white/70" />
								)}
							</div>
							<input
								type="file"
								accept="image/*"
								required
								onChange={
									handleImageUpload
								}
								className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
							/>
							<div className="absolute -bottom-2 -right-2 w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center border-2 border-white/20">
								<User className="w-4 h-4 text-white" />
							</div>
						</div>
					</div>

					<form
						onSubmit={handleSubmit}
						className="space-y-6"
					>
						{/* Name Field */}
						<div>
							<div className="relative">
								<User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-300" />
								<input
									type="text"
									name="name"
									required
									placeholder="Full Name"
									value={
										formData.name
									}
									onChange={
										handleInputChange
									}
									className="w-full pl-12 pr-4 py-3 bg-white/10 backdrop-blur-sm border rounded-xl text-white placeholder-gray-300 transition-all duration-300 focus:outline-none focus:ring-2 border-white/20 hover:border-white/30 focus:border-indigo-400 focus:ring-indigo-400/50"
								/>
							</div>
						</div>

						{/* Email Field */}
						<div>
							<div className="relative">
								<Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-300" />
								<input
									type="email"
									name="email"
									required
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

						{/* Password Field */}
						<div>
							<div className="relative">
								<Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-300" />
								<input
									type={
										showPassword
											? "text"
											: "password"
									}
									name="password"
									required
									placeholder="Password"
									value={
										formData.password
									}
									onChange={
										handleInputChange
									}
									className="w-full pl-12 pr-4 py-3 bg-white/10 backdrop-blur-sm border rounded-xl text-white placeholder-gray-300 transition-all duration-300 focus:outline-none focus:ring-2 border-white/20 hover:border-white/30 focus:border-indigo-400 focus:ring-indigo-400/50"
								/>
								<button
									type="button"
									onClick={() =>
										setShowPassword(
											!showPassword
										)
									}
									className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-300 hover:text-white transition-colors duration-200"
								>
									{showPassword ? (
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
									required
									placeholder="Confirm Password"
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

						{/* Submit Button */}
						<button
							type="submit"
							className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold py-3 px-6 rounded-xl hover:from-indigo-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-opacity-50 transform transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl"
						>
							Create Account
						</button>
					</form>

					{/* Footer */}
					<div className="text-center mt-6 pt-6 border-t border-white/10">
						<p className="text-gray-300">
							Already have an account?{" "}
							<a
								href="#"
								className="text-indigo-400 hover:text-indigo-300 font-medium transition-colors duration-200"
							>
								Sign in
							</a>
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

export default Signup;
