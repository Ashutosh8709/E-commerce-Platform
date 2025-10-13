import { Router } from "express";
import { verifyJwt } from "../middlewares/auth.middleware.js";
import {
	createProduct,
	updateProduct,
	deleteProduct,
	getProductById,
	getProducts,
	getProductsByCategory,
	getFeaturedProducts,
	getNewArrivals,
	getTopRatedProducts,
	filterProducts,
	getRelatedProducts,
} from "../controllers/product.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router.post("/", verifyJwt, upload.single("productImage"), createProduct);

router.patch("/:productId", verifyJwt, updateProduct);

router.delete("/:productId", verifyJwt, deleteProduct);

router.get("/:productId", getProductById);

router.get("/", getProducts);

router.get("/category/:category", getProductsByCategory);

router.get("/featured", getFeaturedProducts);

router.get("/new", getNewArrivals);

router.get("/top-rated", getTopRatedProducts);

router.post("/filter", filterProducts);

router.get("/related/:productId", getRelatedProducts);

export default router;
