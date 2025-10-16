import { Router } from "express";
import { verifyJwt } from "../middlewares/auth.middleware.js";
import {
	getUserOrders,
	getOrderById,
	cancelOrder,
	updateOrderStatus,
	getAllOrders,
	getRevenueStats,
	getSalesAnalytics,
	returnOrder,
	reorder,
	autoCancelUnpaidOrders,
} from "../controllers/order.controller.js";

const router = Router();

// ✅ User Routes
router.post("/place", verifyJwt, placeOrder);
router.get("/user", verifyJwt, getUserOrders);
router.get("/:orderId", verifyJwt, getOrderById);
router.patch("/:orderId/cancel", verifyJwt, cancelOrder);
router.post("/:orderId/return", verifyJwt, returnOrder);
router.post("/:orderId/reorder", verifyJwt, reorder);

// ✅ Admin Routes
router.get("/all", verifyJwt, getAllOrders);
router.patch("/:orderId/status", verifyJwt, updateOrderStatus);
router.get("/analytics/sales", verifyJwt, getSalesAnalytics);
router.get("/analytics/revenue", verifyJwt, getRevenueStats);

// ✅ System/Automation Routes
router.post("/auto-cancel-unpaid", verifyJwt, autoCancelUnpaidOrders);

export default router;
