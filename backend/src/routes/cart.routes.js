import { Router } from "express";
import { verifyJwt } from "../middlewares/auth.middleware.js";
import {
	addToCart,
	getCart,
	updateQuantity,
	removeItem,
	clearCart,
	savedForLater,
	applyPromoCode,
	placeOrder,
} from "../controllers/cart.controller.js";

const router = Router();
router.post("/:productId", verifyJwt, addToCart);
router.get("/", verifyJwt, getCart);
router.patch("/:productId/quantity", verifyJwt, updateQuantity);
router.delete("/:productId", verifyJwt, removeItem);
router.delete("/", verifyJwt, clearCart);
router.post("/:productId/save", verifyJwt, savedForLater);
router.post("/promo", verifyJwt, applyPromoCode);
router.post("/place-order", verifyJwt, placeOrder);

export default router;
