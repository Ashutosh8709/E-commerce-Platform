import { Router } from "express";
import { verifyJwt } from "../middlewares/auth.middleware.js";
import {
	addToCart,
	getCart,
	updateQuantity,
	removeItem,
	clearCart,
	saveForLater,
	applyPromoCode,
	placeOrder,
} from "../controllers/cart.controller.js";

const router = Router();
router.post("/cart/:productId", verifyJwt, addToCart);
router.get("/cart", verifyJwt, getCart);
router.patch("/cart/:productId/quantity", verifyJwt, updateQuantity);
router.delete("/cart/:productId", verifyJwt, removeItem);
router.delete("/cart", verifyJwt, clearCart);
router.post("/cart/:productId/save", verifyJwt, saveForLater);
router.post("/cart/promo", verifyJwt, applyPromoCode);
router.post("/cart/place-order", verifyJwt, placeOrder);

export default router;
