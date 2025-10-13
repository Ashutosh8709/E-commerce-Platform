import { Router } from "express";
import { verifyJwt } from "../middlewares/auth.middleware.js";
import {
	addToWishlist,
	removeFromWishlist,
	addToCart,
	clearWishlist,
	getWishlist,
} from "../controllers/wishlist.controller.js";

const router = Router();

router.post("/wishlist/:productId", verifyJwt, addToWishlist);

router.get("/wishlist", verifyJwt, getWishlist);

router.delete("/wishlist/:productId", verifyJwt, removeFromWishlist);

router.post("/wishlist/:productId/move-to-cart", verifyJwt, addToCart);

router.delete("/wishlist", verifyJwt, clearWishlist);

export default router;
