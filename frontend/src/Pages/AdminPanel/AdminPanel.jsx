import {
	Package,
	Box,
	Receipt,
	Truck,
	Users,
	TrendingUp,
	LayoutGrid,
} from "lucide-react";
import { useState } from "react";

const recentOrders = [
	{
		id: "#12345",
		customer: "Sophia Clark",
		date: "2024-01-15",
		status: "shipped",
		total: 150.0,
	},
	{
		id: "#12346",
		customer: "Ethan Carter",
		date: "2024-01-16",
		status: "delivered",
		total: 200.0,
	},
	{
		id: "#12347",
		customer: "Olivia Bennett",
		date: "2024-01-17",
		status: "processing",
		total: 100.0,
	},
	{
		id: "#12348",
		customer: "Liam Harper",
		date: "2024-01-18",
		status: "shipped",
		total: 180.0,
	},
	{
		id: "#12349",
		customer: "Ava Foster",
		date: "2024-01-19",
		status: "delivered",
		total: 220.0,
	},
];

export default function AdminDashboard() {
	const [activeTab, setActiveTab] = useState("products");

	const getStatusColor = (status) => {
		switch (status) {
			case "shipped":
				return "bg-blue-100 text-blue-800";
			case "delivered":
				return "bg-green-100 text-green-800";
			case "processing":
				return "bg-yellow-100 text-yellow-800";
			default:
				return "bg-slate-100 text-slate-800";
		}
	};

	return (
		<div className="flex min-h-screen bg-slate-50">
			<aside className="w-64 bg-white border-r border-slate-200 flex flex-col">
				<div className="p-6 border-b border-slate-200">
					<h1 className="text-xl font-bold text-slate-900">
						Admin Panel
					</h1>
				</div>

				<nav className="flex-1 px-4 py-6 space-y-2">
					<button
						onClick={() =>
							setActiveTab("products")
						}
						className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
							activeTab === "products"
								? "bg-blue-50 text-blue-600"
								: "text-slate-700 hover:bg-slate-50"
						}`}
					>
						<LayoutGrid size={20} />
						<span>Products</span>
					</button>

					<button
						onClick={() =>
							setActiveTab(
								"inventory"
							)
						}
						className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
							activeTab ===
							"inventory"
								? "bg-blue-50 text-blue-600"
								: "text-slate-700 hover:bg-slate-50"
						}`}
					>
						<Box size={20} />
						<span>Inventory</span>
					</button>

					<button
						onClick={() =>
							setActiveTab("orders")
						}
						className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
							activeTab === "orders"
								? "bg-blue-50 text-blue-600"
								: "text-slate-700 hover:bg-slate-50"
						}`}
					>
						<Receipt size={20} />
						<span>Orders</span>
					</button>

					<button
						onClick={() =>
							setActiveTab(
								"deliveries"
							)
						}
						className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
							activeTab ===
							"deliveries"
								? "bg-blue-50 text-blue-600"
								: "text-slate-700 hover:bg-slate-50"
						}`}
					>
						<Truck size={20} />
						<span>Deliveries</span>
					</button>

					<button
						onClick={() =>
							setActiveTab("users")
						}
						className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
							activeTab === "users"
								? "bg-blue-50 text-blue-600"
								: "text-slate-700 hover:bg-slate-50"
						}`}
					>
						<Users size={20} />
						<span>Users</span>
					</button>

					<button
						onClick={() =>
							setActiveTab(
								"analytics"
							)
						}
						className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
							activeTab ===
							"analytics"
								? "bg-blue-50 text-blue-600"
								: "text-slate-700 hover:bg-slate-50"
						}`}
					>
						<TrendingUp size={20} />
						<span>Analytics</span>
					</button>
				</nav>
			</aside>

			<main className="flex-1 p-8">
				<h1 className="text-3xl font-bold text-slate-900 mb-8">
					Dashboard
				</h1>

				<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
					<div className="bg-white rounded-lg p-6 shadow-sm">
						<p className="text-sm font-medium text-slate-600 mb-2">
							Total Products
						</p>
						<p className="text-3xl font-bold text-slate-900">
							1,250
						</p>
					</div>

					<div className="bg-white rounded-lg p-6 shadow-sm">
						<p className="text-sm font-medium text-slate-600 mb-2">
							Total Orders
						</p>
						<p className="text-3xl font-bold text-slate-900">
							8,420
						</p>
					</div>

					<div className="bg-white rounded-lg p-6 shadow-sm">
						<p className="text-sm font-medium text-slate-600 mb-2">
							Active Users
						</p>
						<p className="text-3xl font-bold text-slate-900">
							5,680
						</p>
					</div>
				</div>

				<div className="mb-8">
					<h2 className="text-2xl font-bold text-slate-900 mb-4">
						Quick Actions
					</h2>
					<div className="flex gap-4">
						<button className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg transition-colors">
							Add Product
						</button>
						<button className="px-6 py-2.5 bg-white hover:bg-slate-50 text-slate-900 text-sm font-semibold border border-slate-200 rounded-lg transition-colors">
							View Orders
						</button>
					</div>
				</div>

				<div>
					<h2 className="text-2xl font-bold text-slate-900 mb-4">
						Recent Orders
					</h2>
					<div className="bg-white rounded-lg shadow-sm overflow-hidden">
						<table className="w-full">
							<thead className="bg-slate-50 border-b border-slate-200">
								<tr>
									<th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
										Order
										ID
									</th>
									<th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
										Customer
									</th>
									<th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
										Date
									</th>
									<th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
										Status
									</th>
									<th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
										Total
									</th>
								</tr>
							</thead>
							<tbody className="divide-y divide-slate-200">
								{recentOrders.map(
									(
										order
									) => (
										<tr
											key={
												order.id
											}
											className="hover:bg-slate-50 transition-colors"
										>
											<td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">
												{
													order.id
												}
											</td>
											<td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
												{
													order.customer
												}
											</td>
											<td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
												{
													order.date
												}
											</td>
											<td className="px-6 py-4 whitespace-nowrap text-sm">
												<span
													className={`px-3 py-1 inline-flex text-xs font-semibold rounded-full ${getStatusColor(
														order.status
													)}`}
												>
													{order.status
														.charAt(
															0
														)
														.toUpperCase() +
														order.status.slice(
															1
														)}
												</span>
											</td>
											<td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
												$
												{order.total.toFixed(
													2
												)}
											</td>
										</tr>
									)
								)}
							</tbody>
						</table>
					</div>
				</div>
			</main>
		</div>
	);
}
