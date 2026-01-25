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
  searchProduct,
} from "../controllers/product.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router.get("/featured", getFeaturedProducts);
router.get("/new", getNewArrivals);
router.get("/search", searchProduct);
router.get("/top-rated", getTopRatedProducts);
router.get("/category/:category", getProductsByCategory);
router.post("/filter", filterProducts);
router.get("/related/:productId", getRelatedProducts);

router.get("/", getProducts);
router.get("/:productId", getProductById);
router.post("/", verifyJwt, upload.single("productImage"), createProduct);
router.patch("/:productId", verifyJwt, updateProduct);
router.delete("/:productId", verifyJwt, deleteProduct);

export default router;
