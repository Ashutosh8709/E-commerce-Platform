import { asyncHandler } from "../utils/AsyncHandler.js";
import { Review } from "../models/review.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const addReview = asyncHandler(async (req, res) => {
	// take productId from req.params
	// take rating title comment images
	// take userId from req.user
	// check if user has ordered this product earlier
	// if ordered then let him order

	const { productId } = req.params;
	const { rating, comment, title } = req.body;
	const userId = req.user?._id;

	if (!productId) {
		throw new ApiError(400, "ProductId is required");
	}

	if (!rating || !comment || !title) {
		throw new ApiError(400, "All fields are required");
	}

	if (!userId) {
		throw new ApiError(401, "Unauthorized Access");
	}

	if (req.userHasPurchased !== true) {
		throw new ApiError(
			403,
			"You can only review purchased products"
		);
	}

	const existingReview = await Review.findOne({
		productId,
		owner: userId,
	});
	if (existingReview) {
		throw new ApiError(
			409,
			"You have already reviewed this product"
		);
	}

	const localReviewImagePath = req.file?.path;
	if (!localReviewImagePath) {
		throw new ApiError(
			404,
			"Local file not found for review Images"
		);
	}

	const reviewImage = await uploadOnCloudinary(localReviewImagePath);
	if (!reviewImage) {
		throw new ApiError(
			400,
			"Review Image not uploaded on Cloudinary"
		);
	}

	const review = await Review.create({
		productId: productId,
		owner: userId,
		rating,
		title,
		comment,
		image: reviewImage,
	});

	return res
		.status(200)
		.jsno(
			new ApiResponse(
				200,
				review,
				"Review Added Successfully"
			)
		);
});

const getReviews = asyncHandler(async (req, res) => {
	// get productId from req params
	// find reviews for the product

	const { productId } = req.params;
	if (!productId) {
		throw new ApiError(404, "Product Id not Found");
	}

	const reviews = await Review.find({ productId }).sort({
		createdAt: -1,
	});

	if (reviews.length === 0) {
		throw new ApiError(400, "Error while fetching reviews");
	}

	return res
		.status(200)
		.json(
			new ApiResponse(
				200,
				reviews,
				"Reviews Fetched Successfully"
			)
		);
});

const updateReview = asyncHandler(async (req, res) => {
	// get product id from req.params
	// get user id from req.user
	// find the review and update it also get new comments from body and title also if available
	const { productId } = req.params;
	const userId = req.user?._id;
	const { newComment, newTitle, rating } = req.body;

	if (!productId) {
		throw new ApiError(400, "Product Id is required");
	}

	if (!userId) {
		throw new ApiError(401, "Unauthorized Access");
	}

	const fieldToUpdate = {};
	if (rating) fieldToUpdate.rating = rating;
	if (newComment) fieldToUpdate.comment = newComment;
	if (newTitle) fieldToUpdate.title = newTitle;

	const updatedReview = await Review.findOneAndUpdate(
		{
			owner: userId,
			productId: productId,
		},
		{ $set: fieldToUpdate },
		{ new: true, runValidators: true }
	);

	if (!updatedReview) {
		throw new ApiError(400, "Review not found not owned by user");
	}

	return res
		.status(200)
		.json(
			new ApiResponse(
				200,
				updatedReview,
				"Review Updated Successfully"
			)
		);
});

const deleteReview = asyncHandler(async (req, res) => {
	// find by product id and user id and delete
	const { productId } = req.params;
	const userId = req.user?._id;

	if (!productId) {
		throw new ApiError(400, "Product id is required");
	}

	if (!userId) {
		throw new ApiError(400, "Unauthorized Access");
	}

	const deletedReview = await Review.findOneAndDelete({
		owner: userId,
		productId: productId,
	});

	if (!deletedReview) {
		throw new ApiError(400, "Review not found not owned by user");
	}

	return res
		.status(200)
		.json(new ApiResponse(200, {}, "Review Deleted Successfully"));
});

const updateReviewImage = asyncHandler(async (req, res) => {
	// take product id from req.params
	// take userid from req.user
	// find the review from that
	// update image path in there
	const { productId } = req.params;
	const userId = req.user?._id;

	if (!productId) {
		throw new ApiError(400, "ProductId is required");
	}

	if (!userId) {
		throw new ApiError(401, "Unauthorised Access");
	}

	const existingReview = await Review.findOne({
		owner: userId,
		productId: productId,
	});

	if (!existingReview) {
		throw new ApiError(400, "Review not found not owned by user");
	}

	const updatedImageLocalPath = req.file?.path;
	if (!updatedImageLocalPath) {
		throw new ApiError(
			400,
			"Local Path for updated image not found"
		);
	}

	const updatedImage = await uploadOnCloudinary(updatedImageLocalPath);
	if (!updatedImage) {
		throw new ApiError(400, "Image not uploaded on cloudinary");
	}

	existingReview.image = updatedImage;

	existingReview.save({ validateBeforeSave: false });

	return res
		.status(200)
		.json(
			new ApiResponse(
				200,
				existingReview,
				"Review Image Updated successfully"
			)
		);
});

export { addReview, getReviews, updateReview, deleteReview, updateReviewImage };
