import React, { useState } from "react";
import { Mail, Lock, Eye, EyeOff, Check, X, LogIn } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

function Login() {
	const [formData, setFormData] = useState({ email: "", password: "" });
	const [showPassword, setShowPassword] = useState(false);
	const [rememberMe, setRememberMe] = useState(false);
	const { login } = useAuth();
	const handleSubmit = (e) => {
		e.preventDefault();
		login(formData);
	};

	const handleInputChange = (e) => {
		setFormData((prev) => ({
			...prev,
			[e.target.name]: e.target.value,
		}));
	};
	return (
		<div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 flex items-center justify-center p-4 relative overflow-hidden">
			{/* Animated background elements */}
			<div className="absolute inset-0 overflow-hidden">
				<div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
				<div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
				<div className="absolute top-40 left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
			</div>

			{/* Main login form */}
			<div className="relative z-10 w-full max-w-md">
				<div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl p-8 border border-white/20">
					{/* Header */}
					<div className="text-center mb-8">
						<div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
							<LogIn className="w-8 h-8 text-white" />
						</div>
						<h1 className="text-3xl font-bold text-white mb-2">
							Welcome Back
						</h1>
						<p className="text-gray-300">
							Sign in to your account
						</p>
					</div>

					<form
						onSubmit={handleSubmit}
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
									className="w-full pl-12 pr-4 py-3 bg-white/10 backdrop-blur-sm border rounded-xl text-white placeholder-gray-300 transition-all duration-300 focus:outline-none focus:ring-2 order-white/20 hover:border-white/30 focus:border-indigo-400 focus:ring-indigo-400/50"
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
									placeholder="Password"
									value={
										formData.password
									}
									onChange={
										handleInputChange
									}
									className="w-full pl-12 pr-4 py-3 bg-white/10 backdrop-blur-sm border rounded-xl text-white placeholder-gray-300 transition-all duration-300 focus:outline-none focus:ring-2 order-white/20 hover:border-white/30 focus:border-indigo-400 focus:ring-indigo-400/50"
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

						{/* Remember Me & Forgot Password */}
						<div className="flex items-center justify-between">
							<label className="flex items-center">
								<input
									type="checkbox"
									checked={
										rememberMe
									}
									onChange={(
										e
									) =>
										setRememberMe(
											e
												.target
												.checked
										)
									}
									className="w-4 h-4 text-indigo-600 bg-white/10 border-white/20 rounded focus:ring-indigo-500 focus:ring-2"
								/>
								<span className="ml-2 text-sm text-gray-300">
									Remember
									me
								</span>
							</label>
							<a
								href="#"
								className="text-sm text-indigo-400 hover:text-indigo-300 transition-colors duration-200"
							>
								Forgot password?
							</a>
						</div>

						{/* Submit Button */}
						<button
							type="submit"
							className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold py-3 px-6 rounded-xl hover:from-indigo-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-opacity-50 transform transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl cursor-pointer"
						>
							Sign In
						</button>
					</form>

					{/* Divider */}
					<div className="my-6">
						<div className="relative">
							<div className="absolute inset-0 flex items-center">
								<div className="w-full border-t border-white/20"></div>
							</div>
							<div className="relative flex justify-center text-sm">
								<span className="px-2 bg-transparent text-gray-300">
									Or
									continue
									with
								</span>
							</div>
						</div>
					</div>

					{/* Social Login Buttons */}
					<div className="grid grid-cols-2 gap-3">
						<button
							type="button"
							className="flex items-center justify-center px-4 py-2 border border-white/20 rounded-lg bg-white/5 hover:bg-white/10 transition-all duration-200 text-white cursor-pointer"
						>
							<svg
								className="w-5 h-5 mr-2"
								viewBox="0 0 24 24"
							>
								<path
									fill="currentColor"
									d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
								/>
								<path
									fill="currentColor"
									d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
								/>
								<path
									fill="currentColor"
									d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
								/>
								<path
									fill="currentColor"
									d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
								/>
							</svg>
							Google
						</button>
						<button
							type="button"
							className="flex items-center justify-center px-4 py-2 border border-white/20 rounded-lg bg-white/5 hover:bg-white/10 transition-all duration-200 text-white cursor-pointer"
						>
							<svg
								className="w-5 h-5 mr-2"
								fill="currentColor"
								viewBox="0 0 24 24"
							>
								<path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
							</svg>
							Facebook
						</button>
					</div>

					{/* Footer */}
					<div className="text-center mt-6 pt-6 border-t border-white/10">
						<p className="text-gray-300">
							Don't have an account?{" "}
							<button className="text-indigo-400 hover:text-indigo-300 font-medium transition-colors duration-200 cursor-pointer">
								Sign up
							</button>
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

export default Login;
