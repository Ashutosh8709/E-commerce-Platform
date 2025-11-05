import { Router } from "express";
import { verifyJwt } from "../middlewares/auth.middleware.js";
import {
  getUserOrders,
  getOrderById,
  cancelOrder,
  returnOrder,
  reorder,
} from "../controllers/order.controller.js";

const router = Router();

router.get("/user", verifyJwt, getUserOrders);
router.get("/:orderId", verifyJwt, getOrderById);
router.patch("/:orderId/cancel", verifyJwt, cancelOrder);
router.post("/:orderId/return", verifyJwt, returnOrder);
router.post("/:orderId/reorder", verifyJwt, reorder);

export default router;
