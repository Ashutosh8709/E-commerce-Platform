import { Router } from "express";
import { verifyJwt } from "../middlewares/auth.middleware.js";
import { verifyAdmin } from "../middlewares/verifyAdmin.middleware.js";

const router = Router();
import {
  getAdminStats,
  getAllOrders,
  updateOrderStatus,
  addProduct,
  updateProduct,
  deleteProduct,
  getSalesAnalytics,
} from "../controllers/admin.controller.js";

router.use(verifyJwt, verifyAdmin);

router.get("/stats", getAdminStats);
router.get("/orders", getAllOrders);
router.patch("/orders/:orderId/status", updateOrderStatus);
router.post("/products", addProduct);
router.patch("/products/:id", updateProduct);
router.delete("/products/:id", deleteProduct);
router.get("/analytics/sales", getSalesAnalytics);

export default router;
