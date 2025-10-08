import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { Order } from "../models/order.model.js";

export const verifyPurchase = asyncHandler(async (req, res, next) => {
	// get product id from req.params
	// get user id from req.user
	// check if user has this product id in their order

	const { productId } = req.params;
	const userId = req.user?._id;

	if (!productId) {
		throw new ApiError(404, "Product Id not Found");
	}
	const hasOrdered = await Order.exists({
		owner: userId,
		"products.productId": productId,
		status: { $in: ["delivered", "returned"] },
	});

	if (!hasOrdered) {
		throw new ApiError(
			404,
			"You can't add your comments for this product"
		);
	}

	req.userHasPurchased = true;
	next();
});
