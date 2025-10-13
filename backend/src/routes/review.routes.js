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

router.post("/:productId/review", verifyJwt, addReview);
router.get("/:productId/reviews", getReviews);
router.patch("/:productId/review", verifyJwt, updateReview);
router.delete("/:productId/review", verifyJwt, deleteReview);
router.patch(
	"/:productId/review/image",
	verifyJwt,
	upload.single("reviewImage"),
	updateReviewImage
);

export default router;
