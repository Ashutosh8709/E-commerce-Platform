import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { Wishlist } from "../models/wishlist.model.js";
import { Cart } from "../models/cart.model.js";
import { Product } from "../models/product.model.js";

const addToWishlist = asyncHandler(async (req, res) => {
	// get productId from req.params
	// get userId from req.user
	// get color,size,quantity,note from req.body
	// now add it to wishlist

	const { productId } = req.params;
	const userId = req.user?._id;
	const { color, size, quantity = 1, note } = req.body;

	if (!productId) {
		throw new ApiError(400, "Product Id is Required");
	}

	if (!userId) {
		throw new ApiError(401, "Unauthorised Access");
	}

	const product = await Product.findById(productId);
	if (!product) throw new ApiError(404, "Product not found");

	let wishlist = await Wishlist.findOne({ owner: userId });

	if (!wishlist) {
		wishlist = new Wishlist({ owner: userId, products: [] });
	}

	const exists = wishlist.products.find(
		(p) => p.productId.toString() === productId
	);
	if (exists) throw new ApiError(400, "Product already in wishlist");

	wishlist.products.push({
		productId,
		color,
		size,
		quantity,
		note,
	});

	await wishlist.save();

	return res
		.status(200)
		.json(
			new ApiResponse(
				200,
				wishlist,
				"Product added to wishlist"
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
		.json(
			new ApiResponse(
				200,
				updatedWishlist,
				"Product Removed Successfully"
			)
		);
});

const addToCart = asyncHandler(async (req, res) => {
	// get user id from req.user
	// get productid for that product
	// check if it exists in the users cart if not add it there and remove from here

	const userId = req.user?._id;
	const { productId } = req.params;

	if (!userId) throw new ApiError(401, "Unauthorized Access");
	if (!productId) throw new ApiError(400, "Product ID is required");

	const wishlist = await Wishlist.findOne({ owner: userId });
	if (!wishlist) throw new ApiError(404, "Wishlist not found");

	const productInWishlist = wishlist.products.find(
		(p) => p.productId.toString() === productId
	);
	if (!productInWishlist)
		throw new ApiError(404, "Product not found in wishlist");

	const product = await Product.findById(productId);
	if (!product) throw new ApiError(404, "Product does not exist anymore");

	const name = product.name;
	const image = product.productImage;

	let cart = await Cart.findOne({ owner: userId });
	if (!cart) {
		cart = new Cart({ owner: userId, products: [] });
	}

	const alreadyInCart = cart.products.find(
		(p) => p.productId.toString() === productId
	);
	if (alreadyInCart) {
		throw new ApiError(400, "Product already exists in cart");
	}

	cart.products.push({
		productId,
		name,
		image,
		quantity: productInWishlist.quantity || 1,
		priceAtAddition: product.offeredPrice,
		color: productInWishlist.color,
		size: productInWishlist.size,
	});

	wishlist.products = wishlist.products.filter(
		(p) => p.productId.toString() !== productId
	);

	await cart.save();
	await wishlist.save();

	return res.status(200).json(
		new ApiResponse(
			200,
			{
				cart,
				wishlist,
			},
			"Product moved from wishlist to cart successfully"
		)
	);
});

const clearWishlist = asyncHandler(async (req, res) => {
	// get userId from req.user
	// find wishlist of that user and delete everything
	const userId = req.user?._id;

	if (!userId) {
		throw new ApiError(401, "Unauthoized Access");
	}

	const wishlist = await Wishlist.findOne({ owner: userId });
	if (!wishlist) {
		throw new ApiError(404, "Wishlist not found");
	}
	wishlist.products = [];
	await wishlist.save();

	return res
		.status(200)
		.json(new ApiResponse(200, {}, "Wishlist Cleared"));
});

const getWishlist = asyncHandler(async (req, res) => {
	// get user id from req.user
	// find wishlist for that user
	const userId = req.user?._id;
	if (!userId) {
		throw new ApiError(401, "Unauthorized Access");
	}

	const wishlist = await Wishlist.aggregate([
		{ $match: { owner: userId } },
		{ $unwind: "$products" },
		{
			$lookup: {
				from: "products",
				localField: "products.productId",
				foreignField: "_id",
				as: "productDetails",
			},
		},
		{ $unwind: "$productDetails" },
		{
			$addFields: {
				"products.name": "$productDetails.name",
				"products.image":
					"$productDetails.productImage",
				"products.originalPrice":
					"$productDetails.originalPrice",
				"products.offeredPrice":
					"$productDetails.offeredPrice",
				"products.stock": {
					$cond: {
						if: {
							$gt: [
								"$productDetails.stock",
								0,
							],
						},
						then: true,
						else: false,
					},
				},
			},
		},
		{
			$group: {
				_id: "$_id",
				owner: { $first: "$owner" },
				products: { $push: "$products" },
			},
		},
	]);

	if (!wishlist) {
		throw new ApiError(400, "Wishlist not found");
	}

	return res
		.status(200)
		.json(
			new ApiResponse(
				200,
				wishlist,
				"Wishlist fetched Successfully"
			)
		);
});
export {
	addToWishlist,
	removeFromWishlist,
	addToCart,
	clearWishlist,
	getWishlist,
};
