import { Package } from "lucide-react";

function Footer() {
	return (
		<footer className="bg-gray-900 text-white">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
				<div className="flex flex-col md:flex-row justify-between items-center gap-8">
					{/* Left Side */}
					<div className="flex flex-col items-center md:items-start gap-4">
						<div className="flex items-center gap-3">
							<div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
								<Package className="w-5 h-5 text-white" />
							</div>
							<span className="text-xl font-bold">
								SwiftCart
							</span>
						</div>
						<p className="text-gray-400 text-center md:text-left">
							© 2025 SwiftCart. All
							rights reserved.
						</p>
					</div>

					{/* Right Side */}
					<div className="flex flex-col items-center md:items-end gap-6">
						<div className="flex flex-wrap justify-center md:justify-end gap-6">
							<a
								href="#"
								className="text-gray-400 hover:text-white transition-colors"
							>
								About Us
							</a>
							<a
								href="#"
								className="text-gray-400 hover:text-white transition-colors"
							>
								Contact
							</a>
							<a
								href="#"
								className="text-gray-400 hover:text-white transition-colors"
							>
								Privacy Policy
							</a>
							<a
								href="#"
								className="text-gray-400 hover:text-white transition-colors"
							>
								Terms of Service
							</a>
						</div>

						{/* Social Links */}
						<div className="flex gap-4">
							<a
								href="#"
								className="text-gray-400 hover:text-white transition-colors"
							>
								<svg
									className="w-6 h-6"
									fill="currentColor"
									viewBox="0 0 24 24"
								>
									<path d="M22.46 6.45c-.81.36-1.68.61-2.59.71a4.57 4.57 0 0 0 1.98-2.49c-.88.52-1.85.9-2.88 1.1a4.56 4.56 0 0 0-7.76 4.15 12.93 12.93 0 0 1-9.39-4.76 4.56 4.56 0 0 0 1.41 6.08c-.75-.02-1.45-.23-2.07-.57v.06a4.56 4.56 0 0 0 3.65 4.47c-.76.21-1.56.24-2.36.09a4.56 4.56 0 0 0 4.25 3.17 9.16 9.16 0 0 1-6.68 1.84A12.89 12.89 0 0 0 20.5 7.5c0-.2 0-.4-.02-.6a4.67 4.67 0 0 0 1.98-2.45z" />
								</svg>
							</a>
							<a
								href="#"
								className="text-gray-400 hover:text-white transition-colors"
							>
								<svg
									className="w-6 h-6"
									fill="currentColor"
									viewBox="0 0 24 24"
								>
									<path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
								</svg>
							</a>
							<a
								href="#"
								className="text-gray-400 hover:text-white transition-colors"
							>
								<svg
									className="w-6 h-6"
									fill="currentColor"
									viewBox="0 0 24 24"
								>
									<path d="M12 2c-2.72 0-3.06.01-4.12.06-1.06.05-1.79.22-2.43.48-.65.26-1.2.59-1.75 1.15s-.89 1.1-1.15 1.75c-.26.64-.43 1.37-.48 2.43C2.01 8.94 2 9.28 2 12s.01 3.06.06 4.12c.05 1.06.22 1.79.48 2.43.26.65.59 1.2 1.15 1.75s1.1.89 1.75 1.15c.64.26 1.37.43 2.43.48 1.06.05 1.4.06 4.12.06s3.06-.01 4.12-.06c1.06-.05 1.79-.22 2.43-.48.65-.26 1.2-.59 1.75-1.15s.89-1.1 1.15-1.75c.26-.64.43-1.37.48-2.43.05-1.06.06-1.4.06-4.12s-.01-3.06-.06-4.12c-.05-1.06-.22-1.79-.48-2.43-.26-.65-.59-1.2-1.15-1.75s-1.1-.89-1.75-1.15c-.64-.26-1.37-.43-2.43-.48C15.06 2.01 14.72 2 12 2zm0 1.8c2.67 0 2.98.01 4.03.06 1.03.05 1.5.2 1.8.33.41.17.69.37.96.64.27.27.47.55.64.96.13.3.28.77.33 1.8.05 1.05.06 1.36.06 4.03s-.01 2.98-.06 4.03c-.05 1.03-.2 1.5-.33 1.8-.17.41-.37.69-.64.96-.27.27-.55.47-.96.64-.3.13-.77.28-1.8.33-1.05.05-1.36.06-4.03.06s-2.98-.01-4.03-.06c-1.03-.05-1.5-.2-1.8-.33-.41-.17-.69-.37-.96-.64-.27-.27-.47-.55-.64-.96-.13-.3-.28-.77-.33-1.8C4.01 14.98 4 14.67 4 12s.01-2.98.06-4.03c.05-1.03.2-1.5.33-1.8.17-.41.37-.69.64-.96.27-.27.55-.47.96-.64.3-.13.77-.28 1.8-.33C9.02 3.81 9.33 3.8 12 3.8zm0 3.35c-2.42 0-4.35 1.93-4.35 4.35s1.93 4.35 4.35 4.35 4.35-1.93 4.35-4.35-1.93-4.35-4.35-4.35zm0 7c-1.49 0-2.65-1.16-2.65-2.65S10.51 9.5 12 9.5s2.65 1.16 2.65 2.65S13.49 14.15 12 14.15zm5.85-6.8c-.52 0-.95.43-.95.95s.43.95.95.95.95-.43.95-.95-.43-.95-.95-.95z" />
								</svg>
							</a>
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
}

export default Footer;
