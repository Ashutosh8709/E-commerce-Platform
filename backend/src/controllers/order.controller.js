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

	const orders = await Order.find({ owner: userId }).sort({
		createdAt: -1,
	});

	if (!orders || orders.length === 0) {
		throw new ApiError(400, "No orders found for this user");
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

const getOrderById = asyncHandler(async (req, res) => {});

const cancelOrder = asyncHandler(async (req, res) => {});

const updateOrderStatus = asyncHandler(async (req, res) => {});

const getAllOrders = asyncHandler(async (req, res) => {});

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
