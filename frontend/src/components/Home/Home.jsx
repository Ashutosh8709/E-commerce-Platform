import React from "react";

const Home = () => {
	return (
		<div className="bg-background-light dark:bg-background-dark text-gray-800 dark:text-gray-200">
			{/* Header */}
			<header className="shadow-sm">
				<div className="container mx-auto flex items-center justify-between px-6 py-4">
					<div className="flex items-center gap-8">
						<div className="flex items-center gap-3 text-gray-900 dark:text-white">
							<span className="material-symbols-outlined text-primary text-3xl">
								shopping_bag
							</span>
							<h2 className="text-xl font-bold">
								ShopSmart
							</h2>
						</div>
						<nav className="hidden md:flex items-center gap-8">
							<a
								className="text-sm font-medium hover:text-primary"
								href="#"
							>
								Home
							</a>
							<a
								className="text-sm font-medium hover:text-primary"
								href="#"
							>
								Shop
							</a>
							<a
								className="text-sm font-medium hover:text-primary"
								href="#"
							>
								Deals
							</a>
							<a
								className="text-sm font-medium hover:text-primary"
								href="#"
							>
								Services
							</a>
						</nav>
					</div>
					<div className="flex items-center gap-4">
						<div className="relative hidden sm:block">
							<span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
								search
							</span>
							<input
								type="text"
								placeholder="Search"
								className="form-input w-full rounded-full border-gray-200 bg-white py-2 pl-10 pr-4 text-sm focus:border-primary focus:ring-primary"
							/>
						</div>
						<div className="flex items-center gap-2">
							<button className="rounded-full p-2 hover:bg-primary/10">
								<span className="material-symbols-outlined text-gray-600">
									favorite_border
								</span>
							</button>
							<button className="relative rounded-full p-2 hover:bg-primary/10">
								<span className="material-symbols-outlined text-gray-600">
									shopping_cart
								</span>
								<span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-bold text-white">
									3
								</span>
							</button>
							<button
								className="bg-center bg-no-repeat bg-cover rounded-full size-10 border-2 border-primary"
								style={{
									backgroundImage:
										'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBSeQZ-WQ1K0zONuFZJV1GgMOiwuWp1Wsobkr64_69MMTxX91CMNTDZCpGTjZV-aLexpx3jCrOMLY_qHEWMnro6o6h52tJwgi7vuuIqJ004lYBYVYLTghL05xqagBt67b-InKy622Hw1UaFv1oa07JOqdi1Q7puuLb3wjq6oKBDWIgrSxCDRCy4LCH2wltaDy3SkVeJxKZE7ozj8TUdD80JrSFE4sInXov6ho4Cov0ty1n75o0NIuU13s23UsKhOXHB7lhzTKsdmQw")',
								}}
							></button>
						</div>
					</div>
				</div>
			</header>

			{/* Hero Section */}
			<main className="container mx-auto px-6 py-8">
				<div
					className="relative mb-12 flex min-h-[480px] items-end justify-start rounded-xl bg-cover bg-center p-8 text-white"
					style={{
						backgroundImage:
							'linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.6)), url("https://lh3.googleusercontent.com/aida-public/AB6AXuCdV4vsYsMpcVEMJKa8IGJSr7jBQc_W5z7UmRcz5DWtoSOMLQ0IjRjh7Zd5cV-rC0j5JAywSmh_-o3ScnIHdlF9Il-3cqkDxNB9VKSYTuZX5cGa22qRQNR5vWdGTCT7CFeHv_m8mcLxcHsPMbpYQdORg_jJR_i5r8hpHh6t-1Q8DB48goXtxM9ncn9R14Wu2LY6bQ3tRgoLNP6ThBS3xxFxP24UbZoHuQ2Ukgq9trnXvvWfQ--HnnhZtX9YVHazAB_c7P8Oczobgu0")',
					}}
				>
					<div className="max-w-lg space-y-4">
						<h1 className="text-4xl md:text-5xl font-black tracking-tight">
							Elevate Your Home
						</h1>
						<p className="text-base md:text-lg">
							Discover curated
							collections of furniture
							and decor to transform
							your living space.
						</p>
						<button className="rounded-lg bg-primary px-6 py-3 text-white font-bold shadow-lg hover:scale-105 transition-transform">
							Shop Now
						</button>
					</div>
				</div>

				{/* Category, Trending, New Arrivals, Footer */}
				{/* 👇 You can reuse the structure from your HTML and wrap them in React components like <CategorySection />, <TrendingNow />, <NewArrivals />, <Footer /> */}
			</main>
		</div>
	);
};

export default Home;
