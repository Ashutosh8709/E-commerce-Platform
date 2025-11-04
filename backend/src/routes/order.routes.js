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

router.get("/user", verifyJwt, getUserOrders);
router.get("/all", verifyJwt, getAllOrders);
router.get("/:orderId", verifyJwt, getOrderById);
router.patch("/:orderId/cancel", verifyJwt, cancelOrder);
router.post("/:orderId/return", verifyJwt, returnOrder);
router.post("/:orderId/reorder", verifyJwt, reorder);

router.patch("/:orderId/status", verifyJwt, updateOrderStatus);
router.get("/analytics/sales", verifyJwt, getSalesAnalytics);
router.get("/analytics/revenue", verifyJwt, getRevenueStats);

router.post("/auto-cancel-unpaid", verifyJwt, autoCancelUnpaidOrders);

export default router;
