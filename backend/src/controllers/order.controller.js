import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Order } from "../models/order.model.js";

const getUserOrders = asyncHandler(async (req, res) => {
	// get userId from req.user
	// find the orders for that user
	// send orders
	const userId = req.user?._id;

	if (!userId) {
		throw new ApiError(401, "Unauthorised Access");
	}

	const orders = await Order.find({ owner: userId })
		.sort({
			createdAt: -1,
		})
		.select("-paymentId")
		.select("-paymentGatewayOrderId");

	if (!orders || orders.length === 0) {
		throw new ApiError(200, "No orders found for this user");
	}

	return res
		.status(200)
		.json(
			new ApiResponse(
				200,
				orders,
				"Order Fetched Successfully"
			)
		);
});

const getOrderById = asyncHandler(async (req, res) => {
	// get order Id from req.params
	// check user Verified
	// find the order and send
	const userId = req.user?._id;

	if (!userId) {
		throw new ApiError(401, "Unauthorised Access");
	}

	const { orderId } = req.params;

	if (!orderId) {
		throw new ApiError(400, "Order id is required");
	}

	const order = await Order.findOne({ owner: userId, _id: orderId });

	if (!order) {
		throw new ApiError(
			400,
			"Order not found or not ordered by you"
		);
	}

	return res
		.status(200)
		.json(
			new ApiResponse(
				200,
				order,
				"Order Fetched Successfully"
			)
		);
});

const cancelOrder = asyncHandler(async (req, res) => {
	// get orderId from req.params
	// get user verified
	const { orderId } = req.params;
	const userId = req.user?._id;

	if (!userId) throw new ApiError(401, "Unauthorized access");
	if (!orderId) throw new ApiError(400, "Order ID is required");

	// Fetch the order and ensure ownership
	const order = await Order.findOne({
		_id: orderId,
		owner: userId,
	}).populate("items.productId");

	if (!order) {
		throw new ApiError(
			404,
			"Order not found or not owned by this user"
		);
	}

	// Prevent double or invalid cancellation
	if (["cancelled", "delivered", "returned"].includes(order.status)) {
		throw new ApiError(
			400,
			`Order cannot be cancelled as it is already ${order.status}`
		);
	}

	// Optional: Restore product stock (if order not shipped yet)
	for (const item of order.products) {
		if (item?.productId?._id) {
			await Product.findByIdAndUpdate(item.productId._id, {
				$inc: { stock: item.quantity },
			});
		}
	}

	// Optional: Refund logic (mock or integrate)
	if (order.paymentStatus === "paid") {
		// await refundPayment(order.paymentId); // integrate Razorpay/Stripe here
		order.refundStatus = "initiated";
	}

	// Update order status
	order.status = "cancelled";
	order.cancelledAt = new Date();

	await order.save();

	return res
		.status(200)
		.json(
			new ApiResponse(
				200,
				order,
				"Order cancelled successfully"
			)
		);
});

const updateOrderStatus = asyncHandler(async (req, res) => {});

const getAllOrders = asyncHandler(async (req, res) => {
	// get user details from req.user
	// check if role is admin
	// give all orders done till now
	// need websockets
});

const getSalesAnalytics = asyncHandler(async (req, res) => {});

const returnOrder = asyncHandler(async (req, res) => {});

const reorder = asyncHandler(async (req, res) => {});

const autoCancelUnpaidOrders = asyncHandler(async (req, res) => {});

const getRevenueStats = asyncHandler(async (req, res) => {});

export {
	getUserOrders,
	getOrderById,
	cancelOrder,
	updateOrderStatus,
	getAllOrders,
	getRevenueStats,
	getSalesAnalytics,
	reorder,
	returnOrder,
	autoCancelUnpaidOrders,
};
