import { Router } from "express";
import { verifyJwt } from "../middlewares/auth.middleware.js";
import {
	addReview,
	getReviews,
	updateReview,
	deleteReview,
	updateReviewImage,
} from "../controllers/review.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router.post("/:productId", verifyJwt, addReview);
router.get("/:productId", getReviews);
router.patch("/:productId", verifyJwt, updateReview);
router.delete("/:productId", verifyJwt, deleteReview);
router.patch(
	"/:productId/image",
	verifyJwt,
	upload.single("reviewImage"),
	updateReviewImage
);

export default router;
