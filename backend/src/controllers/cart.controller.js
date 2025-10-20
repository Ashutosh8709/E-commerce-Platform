import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { Cart } from "../models/cart.model.js";
import { Product } from "../models/product.model.js";
import { PromoCode } from "../models/promoCode.model.js";

const addToCart = asyncHandler(async (req, res) => {
	// take product details from req.body
	// check if product exists
	// if the user has cart already add product
	// if same product already exists then add quantity
	// otherwise create add new product
	const { productId } = req.params;
	const { quantity = 1, color, size } = req.body;
	const userId = req.user?._id;

	if (!userId) {
		throw new ApiError(401, "Unauthorized Access");
	}

	const product = await Product.findById(productId);

	if (!product) {
		throw new ApiError(404, "Product not Found");
	}

	const price = product.offeredPrice;
	const name = product.name;
	const image = product?.productImage;

	let cart = await Cart.findOne({ owner: userId });

	if (!cart) {
		cart = new Cart({ owner: userId, products: [] });
	}

	const existingProduct = cart.products.find(
		(p) =>
			p.productId.toString() === productId &&
			(!color || p.color === color) &&
			(!size || p.size === size)
	);

	if (existingProduct) {
		existingProduct.quantity += quantity;
	} else {
		cart.products.push({
			productId,
			name,
			image,
			quantity,
			priceAtAddition: price,
			color,
			size,
		});
	}

	await cart.save();

	return res
		.status(200)
		.json(
			new ApiResponse(
				200,
				cart,
				"Product Added to Cart Successfully"
			)
		);
});

const getCart = asyncHandler(async (req, res) => {
	// get user id from req.user
	// find if user has cart and if yes return it
	const userId = req.user?._id;
	const cart = await Cart.findOne({ owner: userId });
	if (!cart) {
		return res
			.status(200)
			.json(new ApiResponse(200, {}, "Add items to cart"));
	}
	return res
		.status(200)
		.json(new ApiResponse(200, cart, "Items fetched Successfully"));
});

const updateQuantity = asyncHandler(async (req, res) => {
	// get productId and quantity from req.body
	// find user's cart
	// find that product in cart and mark the new quantity of it
	// also at last convert price and update it
	const { productId } = req.params;
	const { quantity } = req.body;
	const userId = req.user?._id;

	let cart = await Cart.findOne({ owner: userId });
	if (!cart) {
		throw new ApiError(404, "No Cart Available");
	}

	const item = cart.products.find(
		(p) => p.productId.toString() === productId
	);
	if (!item) {
		throw new ApiError(404, "Product not in cart");
	}

	item.quantity = quantity;

	await cart.save();
	return res
		.status(200)
		.json(
			new ApiResponse(
				200,
				cart,
				"Quantity updated successfully"
			)
		);
});

const removeItem = asyncHandler(async (req, res) => {
	// get product id from req.body and filter out the cart or pull
	const { productId } = req.params;
	const userId = req.user?._id;

	const cart = await Cart.findOneAndUpdate(
		{ owner: userId },
		{ $pull: { products: { productId } } },
		{ new: true }
	);

	if (!cart) {
		throw new ApiError(404, "No Cart Found");
	}

	await cart.save();

	return res
		.status(200)
		.json(new ApiResponse(200, cart, "Item REmoved Successfully"));
});

const clearCart = asyncHandler(async (req, res) => {
	// get user if and find and update cart for no products
	const userId = req.user?._id;
	const cart = await Cart.findOneAndUpdate(
		{ owner: userId },
		{
			$set: {
				products: [],
				totalAmount: 0,
				discount: 0,
				promoCode: null,
				status: "active",
			},
		},
		{ new: true }
	);
	if (!cart) {
		throw new ApiError(404, "No cart Found");
	}

	return res
		.status(200)
		.json(new ApiResponse(200, cart, "Cart Cleared Successfully"));
});

const savedForLater = asyncHandler(async (req, res) => {
	// get product id from body
	// find cart for user and check if product is in cart and save it savedForLatre
	const { productId } = req.params;
	const userId = req.user?._id;

	const cart = await Cart.findOneAndUpdate(
		{ owner: userId },
		{
			$pull: { products: { productId } },
			$addToSet: { savedForLater: productId },
		},
		{ new: true }
	);

	if (!cart) {
		throw new ApiError(404, "Cart not Found");
	}

	await cart.save();

	return res
		.status(200)
		.json(new ApiResponse(200, cart, "Item saved for later"));
});

const applyPromoCode = asyncHandler(async (req, res) => {
	// get code from body
	// find cart
	// find discount from promo
	// update final price
	const { code } = req.body;
	const userId = req.user?._id;

	const cart = await Cart.findOne({ owner: userId });
	if (!cart) throw new ApiError(404, "Cart not found");

	const promo = await PromoCode.findOne({ code, isActive: true });
	if (!promo) throw new ApiError(404, "Invalid Promo Code");

	if (promo.expiresAt && promo.expiresAt < Date.now()) {
		throw new ApiError(400, "Promo COde Expired");
	}

	if (cart.totalAmount < promo.minPurchase) {
		throw new ApiError(
			400,
			`Minimum Purchase of ${promo.minPurchase} required`
		);
	}

	let discount = 0;
	if (promo.discountType === "flat") {
		discount = promo.value;
	} else if (promo.discountType === "percent") {
		discount = (cart.totalAmount * promo.value) / 100;
		if (promo.maxDiscount) {
			discount = Math.min(discount, promo.maxDiscount);
		}
	}

	cart.discount = discount;
	cart.promoCode = promo.code;
	cart.totalAmount =
		cart.products.reduce(
			(sum, p) => sum + p.quantity * p.priceAtAddition,
			0
		) - discount;

	await cart.save();

	return res
		.status(200)
		.json(
			new ApiResponse(
				200,
				cart,
				`Promo code applied: ${promo.code}`
			)
		);
});

const placeOrder = asyncHandler(async (req, res) => {
	const userId = req.user?._id;
	const { paymentMethod, shippingAddress } = req.body;
	const cart = await Cart.findOne({ owner: userId });
});
export {
	addToCart,
	getCart,
	updateQuantity,
	removeItem,
	clearCart,
	savedForLater,
	applyPromoCode,
	placeOrder,
};
