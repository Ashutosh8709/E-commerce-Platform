import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Product } from "../models/product.model.js";
import { Category } from "../models/category.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const createProduct = asyncHandler(async (req, res) => {
	// get user which is seller id from req.user
	// get all other fields from body
	// check for fields available
	// create product from that
	// also handle image
	const sellerId = req.user?._id;
	const {
		name,
		description,
		originalPrice,
		offeredPrice,
		stock,
		colors,
		categoryId,
	} = req.body;

	if (!sellerId) {
		throw new ApiError(401, "Unauthorized Access");
	}

	if (req.user.role !== "seller") {
		throw new ApiError(403, "Only sellers can add products");
	}

	if (
		!name ||
		!description ||
		!originalPrice ||
		!offeredPrice ||
		stock == null ||
		colors.length === 0 ||
		!categoryId
	) {
		throw new ApiError(400, "All Fields Are Required");
	}

	const categoryExists = await Category.findById(categoryId);
	if (!categoryExists) {
		throw new ApiError(404, "Invalid Category Id");
	}

	if (
		typeof originalPrice !== "number" ||
		typeof offeredPrice !== "number"
	) {
		throw new ApiError(400, "Prices must be numbers");
	}

	if (offeredPrice > originalPrice) {
		throw new ApiError(
			400,
			"Offered price cannot exceed original price"
		);
	}

	if (stock < 0) {
		throw new ApiError(400, "Stock cannot be negative");
	}

	const localProductImage = req.file?.path;
	if (!localProductImage) {
		throw new ApiError(400, "Local path for image not found");
	}

	const uploadedImage = await uploadOnCloudinary(localProductImage);
	if (!uploadedImage) {
		throw new ApiError(400, "Error while uploading file on cloud");
	}

	const product = await Product.create({
		sellerId,
		name,
		description,
		originalPrice,
		offeredPrice,
		stock,
		colors,
		categoryId,
		productImage: uploadedImage.secure_url,
	});

	if (!product) {
		throw new ApiError(400, "Error while adding product");
	}

	return res
		.status(200)
		.json(
			new ApiResponse(
				200,
				product,
				"Product Added Successfully"
			)
		);
});

const updateProduct = asyncHandler(async (req, res) => {
	const userId = req.user?._id;
	const { productId } = req.params;

	if (!userId) {
		throw new ApiError(401, "Unauthorized Access");
	}

	const role = req.user?.role;
	if (role !== "admin" && role !== "seller") {
		throw new ApiError(
			400,
			"Only seller and admin are allowed to update the project"
		);
	}

	if (!productId) {
		throw new ApiError(400, "Product id is required");
	}
	const { name, description, originalPrice, offeredPrice, colors } =
		req.body;

	const fieldsToUpdate = {};
	if (name) fieldsToUpdate.name = name;
	if (description) fieldsToUpdate.description = description;
	if (originalPrice) fieldsToUpdate.originalPrice = originalPrice;
	if (offeredPrice) fieldsToUpdate.offeredPrice = offeredPrice;
	if (colors.length) fieldsToUpdate.colors = colors;

	const updatedProduct = await Product.findByIdAndUpdate(
		productId,
		{
			$set: fieldsToUpdate,
		},
		{ new: true, runValidators: true }
	);

	if (!updatedProduct) {
		throw new ApiError(400, "Product not updated");
	}

	return res
		.status(200)
		.json(
			new ApiResponse(
				200,
				updatedProduct,
				"Product Updated Successfully"
			)
		);
});

const deleteProduct = asyncHandler(async (req, res) => {
	// get product id from req.params
	// search product
	// and delete it
	const userId = req.user?._id;

	if (!userId) {
		throw new ApiError(401, "Unauthorized Access");
	}

	const role = req.user?.role;

	if (role !== "admin" && role !== "seller") {
		throw new ApiError(
			403,
			"Access denied: only admin or seller can delete products"
		);
	}

	const { productId } = req.params;
	if (!productId) {
		throw new ApiError(400, "Product not found");
	}

	const product = await Product.findById(productId);
	if (!product) throw new ApiError(404, "Product not found");

	if (
		role === "seller" &&
		product.sellerId.toString() !== userId.toString()
	) {
		throw new ApiError(
			403,
			"You can delete only your own products"
		);
	}

	const deletedProduct = await Product.findByIdAndDelete(productId);
	if (!deletedProduct) {
		throw new ApiError(400, "Product not deleted");
	}

	return res
		.status(200)
		.json(new ApiResponse(200, {}, "Product deleted Successfully"));
});

const getProductById = asyncHandler(async (req, res) => {
	// get product id
	// search for product
	// if exist send
	const { productId } = req.params;
	if (!productId) {
		throw new ApiError(400, "Product Id is required");
	}

	const product = await Product.findById(productId);
	if (!product) {
		throw new ApiError(400, "Product not found");
	}

	return res
		.status(200)
		.json(
			new ApiResponse(
				200,
				product,
				"Product fetched Successfully"
			)
		);
});

const getProducts = asyncHandler(async (req, res) => {});

const getProductsByCategory = asyncHandler(async (req, res) => {});

const getFeaturedProducts = asyncHandler(async (req, res) => {});

const getNewArrivals = asyncHandler(async (req, res) => {});

const getTopRatedProducts = asyncHandler(async (req, res) => {});

const filterProducts = asyncHandler(async (req, res) => {});

const getRelatedProducts = asyncHandler(async (req, res) => {});

export {
	createProduct,
	updateProduct,
	deleteProduct,
	getProductById,
	getProducts,
	getFeaturedProducts,
	getProductsByCategory,
	getNewArrivals,
	getTopRatedProducts,
	filterProducts,
	getRelatedProducts,
};
