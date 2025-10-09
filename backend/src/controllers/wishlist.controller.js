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

	return res.status(200).json(200, wishlist, "Product Added to Wishlist");
});

const removeFromWishlist = asyncHandler(async (req, res) => {
	// get user
});
export { addToWishlist, removeFromWishlist };
