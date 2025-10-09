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
});

export { addToWishlist };
