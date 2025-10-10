import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { Wishlist } from "../models/wishlist.model.js";

const addToWishlist = asyncHandler(async (req, res) => {
	// get productId from req.params
	// get userId from req.user
	// now add it to wishlist

	const { productId } = req.params;
	const userId = req.user?._id;

	if (!productId) {
		throw new ApiError(400, "Product Id is Required");
	}

	if (!userId) {
		throw new ApiError(401, "Unauthorised Access");
	}

	const existingWishListProduct = await Wishlist.findOne({
		owner: userId,
		"products.productId": productId,
	});

	if (existingWishListProduct) {
		throw new ApiError(400, "Product Already exists in wishlist");
	}

	const wishlist = await Wishlist.create({
		owner: userId,
		"products.productId": productId,
	});

	if (!wishlist) {
		throw new ApiError(400, "Error in Adding product to wishlist");
	}

	return res
		.status(200)
		.json(
			new ApiResponse(
				200,
				wishlist,
				"Product Added to Wishlist"
			)
		);
});

const removeFromWishlist = asyncHandler(async (req, res) => {
	// get user from req.user
	// get productId from req.params
	// find the product in wishlist and remove it
	const userId = req.user?._id;
	const { productId } = req.params;

	if (!userId) {
		throw new ApiError(401, "Unauthorized Access");
	}

	if (!productId) {
		throw new ApiError(400, "Product Id is required");
	}

	const updatedWishlist = await Wishlist.findOneAndUpdate(
		{ owner: userId },
		{ $pull: { products: { productId } } },
		{ new: true }
	);

	if (!updatedWishlist) {
		throw new ApiError(
			400,
			"Product not exists in wishlist or not in your wishlist"
		);
	}

	return res
		.status(200)
		.json(new ApiResponse(200, {}, "Product Removed Successfully"));
});

const addToCart = asyncHandler(async (req, res) => {
	// get user id from req.user
	// get productid for that product
	// check if it exists in the users cart if not add it there and remove from here

	const userId = req.user?._id;
	const { productId } = req.params;

	if (!userId) {
		throw new ApiError(401, "Unauthorized Access");
	}

	if (!productId) {
		throw new ApiError(400, "Product Id is Required");
	}
});

const clearWishlist = asyncHandler(async (req, res) => {});

const getWishlist = asyncHandler(async (req, res) => {});
export {
	addToWishlist,
	removeFromWishlist,
	addToCart,
	clearWishlist,
	getWishlist,
};
