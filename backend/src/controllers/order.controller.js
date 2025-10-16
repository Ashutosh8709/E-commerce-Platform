import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Order } from "../models/order.model.js";

const getUserOrders = asyncHandler(async (req, res) => {});

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
