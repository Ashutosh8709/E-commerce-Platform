import { useState } from "react";
import { Search, Package, Tag, Shield, Truck } from "lucide-react";
import NotificationItem from "./NotificationItem";

const initialNotifications = [
	{
		id: "1",
		type: "order",
		title: "Order Shipped",
		message: "Your order #12345 has been shipped and is expected to arrive on July 20th.",
		time: "10:00 AM",
		status: "unread",
	},
	{
		id: "2",
		type: "promo",
		title: "Weekend Sale",
		message: "Get 20% off on all electronics this weekend!",
		time: "Yesterday",
		status: "read",
	},
	{
		id: "3",
		type: "system",
		title: "Password Updated",
		message: "Your account password has been successfully updated.",
		time: "July 16",
		status: "read",
	},
	{
		id: "4",
		type: "delivery",
		title: "Delivery Scheduled",
		message: "Your delivery for order #67890 is scheduled for tomorrow between 2 PM and 4 PM.",
		time: "July 15",
		status: "archived",
	},
];

export default function NotificationsPage() {
	const [notifications, setNotifications] =
		useState(initialNotifications);
	const [searchQuery, setSearchQuery] = useState("");
	const [statusFilter, setStatusFilter] = useState("all");
	const [typeFilter, setTypeFilter] = useState("all");

	const getIcon = (type) => {
		const iconProps = { size: 20 };
		switch (type) {
			case "order":
				return (
					<Package
						{...iconProps}
						className="text-blue-600"
					/>
				);
			case "promo":
				return (
					<Tag
						{...iconProps}
						className="text-slate-600"
					/>
				);
			case "system":
				return (
					<Shield
						{...iconProps}
						className="text-slate-600"
					/>
				);
			case "delivery":
				return (
					<Truck
						{...iconProps}
						className="text-slate-600"
					/>
				);
			default:
				return (
					<Package
						{...iconProps}
						className="text-slate-600"
					/>
				);
		}
	};

	const filteredNotifications = notifications.filter((notif) => {
		const matchesSearch =
			notif.title
				.toLowerCase()
				.includes(searchQuery.toLowerCase()) ||
			notif.message
				.toLowerCase()
				.includes(searchQuery.toLowerCase());
		const matchesStatus =
			statusFilter === "all" || notif.status === statusFilter;
		const matchesType =
			typeFilter === "all" || notif.type === typeFilter;
		return matchesSearch && matchesStatus && matchesType;
	});

	const handleMarkAsRead = (id) => {
		setNotifications((prev) =>
			prev.map((notif) =>
				notif.id === id
					? { ...notif, status: "read" }
					: notif
			)
		);
	};

	const handleArchive = (id) => {
		setNotifications((prev) =>
			prev.map((notif) =>
				notif.id === id
					? { ...notif, status: "archived" }
					: notif
			)
		);
	};

	const handleDelete = (id) => {
		setNotifications((prev) =>
			prev.filter((notif) => notif.id !== id)
		);
	};

	const handleMarkAllAsRead = () => {
		setNotifications((prev) =>
			prev.map((notif) =>
				notif.status === "unread"
					? { ...notif, status: "read" }
					: notif
			)
		);
	};

	const handleArchiveAll = () => {
		setNotifications((prev) =>
			prev.map((notif) =>
				notif.status !== "archived"
					? { ...notif, status: "archived" }
					: notif
			)
		);
	};

	return (
		<div className="max-w-5xl mx-auto">
			<div className="mb-8">
				<h1 className="text-3xl font-bold text-slate-900 mb-2 mt-4">
					Notifications
				</h1>
				<p className="text-slate-600">
					Manage your notifications and stay
					updated.
				</p>
			</div>

			<div className="bg-white rounded-xl shadow-sm p-6 mb-6">
				<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
					<div className="relative md:col-span-1">
						<Search
							size={18}
							className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
						/>
						<input
							type="text"
							placeholder="Search notifications..."
							value={searchQuery}
							onChange={(e) =>
								setSearchQuery(
									e.target
										.value
								)
							}
							className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
						/>
					</div>

					<div>
						<select
							value={statusFilter}
							onChange={(e) =>
								setStatusFilter(
									e.target
										.value
								)
							}
							className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
						>
							<option value="all">
								All Statuses
							</option>
							<option value="unread">
								Unread
							</option>
							<option value="read">
								Read
							</option>
							<option value="archived">
								Archived
							</option>
						</select>
					</div>

					<div>
						<select
							value={typeFilter}
							onChange={(e) =>
								setTypeFilter(
									e.target
										.value
								)
							}
							className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
						>
							<option value="all">
								All Types
							</option>
							<option value="order">
								Order
							</option>
							<option value="promo">
								Promo
							</option>
							<option value="system">
								System
							</option>
							<option value="delivery">
								Delivery
							</option>
						</select>
					</div>
				</div>
			</div>

			<div className="flex justify-end gap-3 mb-6">
				<button
					onClick={handleMarkAllAsRead}
					className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
				>
					Mark all as read
				</button>
				<button
					onClick={handleArchiveAll}
					className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
				>
					Archive All
				</button>
			</div>

			<div className="space-y-4">
				{filteredNotifications.length === 0 ? (
					<div className="bg-white rounded-lg shadow-sm p-12 text-center">
						<p className="text-slate-500">
							No notifications found
						</p>
					</div>
				) : (
					filteredNotifications.map(
						(notification) => (
							<NotificationItem
								key={
									notification.id
								}
								id={
									notification.id
								}
								icon={getIcon(
									notification.type
								)}
								title={
									notification.title
								}
								message={
									notification.message
								}
								time={
									notification.time
								}
								status={
									notification.status
								}
								isHighlighted={
									notification.status ===
									"unread"
								}
								onMarkAsRead={
									handleMarkAsRead
								}
								onArchive={
									handleArchive
								}
								onDelete={
									handleDelete
								}
							/>
						)
					)
				)}
			</div>
		</div>
	);
}
