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

router.post("/:productId", verifyJwt, addToWishlist);

router.get("/", verifyJwt, getWishlist);

router.delete("/:productId", verifyJwt, removeFromWishlist);

router.post("/:productId/move-to-cart", verifyJwt, addToCart);

router.delete("/", verifyJwt, clearWishlist);

export default router;
