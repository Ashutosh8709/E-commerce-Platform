import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Product } from "../models/product.model.js";
import { Category } from "../models/category.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { client } from "../client.js";

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

  if (typeof originalPrice !== "number" || typeof offeredPrice !== "number") {
    throw new ApiError(400, "Prices must be numbers");
  }

  if (offeredPrice > originalPrice) {
    throw new ApiError(400, "Offered price cannot exceed original price");
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

  await client.del("newArrivals");

  return res
    .status(200)
    .json(new ApiResponse(200, product, "Product Added Successfully"));
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
  const { name, description, originalPrice, offeredPrice, colors } = req.body;

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
    .json(new ApiResponse(200, updatedProduct, "Product Updated Successfully"));
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

  if (role === "seller" && product.sellerId.toString() !== userId.toString()) {
    throw new ApiError(403, "You can delete only your own products");
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
  let cachedProduct;
  try {
    cachedProduct = await client.get(`product:${productId}`);
  } catch (error) {
    console.error(
      "Redis unavaialable, continuing without cache:",
      error.message
    );
  }
  if (cachedProduct) {
    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          JSON.parse(cachedProduct),
          "Product fetched from cache"
        )
      );
  }

  const product = await Product.findById(productId);
  if (!product) {
    throw new ApiError(400, "Product not found");
  }

  try {
    await client.setex(`product:${productId}`, 3600, JSON.stringify(product));
  } catch (error) {
    console.error("Redis cache save failed:", error.message);
  }

  return res
    .status(200)
    .json(new ApiResponse(200, product, "Product fetched Successfully"));
});

const getProducts = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  const cacheKey = `products:page:${page}:limit:${limit}`;
  let cachedData;
  try {
    cachedData = await client.get(cacheKey);
  } catch (error) {
    console.error("Redis Unavailable, continuing without cache", error.message);
  }

  if (cachedData) {
    return res
      .status(200)
      .json(
        new ApiResponse(200, JSON.parse(cachedData), "Data fetched from cache")
      );
  }

  const skip = (page - 1) * limit;

  const products = await Product.find({})
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: -1 });

  const totalProducts = await Product.countDocuments();

  const totalPages = Math.ceil(totalProducts / limit);

  const payload = {
    products,
    pagination: {
      totalProducts,
      totalPages,
      currentPage: page,
      limit,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1,
    },
  };

  try {
    await client.setex(cacheKey, 3600, JSON.stringify(payload));
  } catch (error) {
    console.error("Redis cache save failed:", error.message);
  }

  return res
    .status(200)
    .json(new ApiResponse(200, payload, "Products fetched successfully"));
});

const getProductsByCategory = asyncHandler(async (req, res) => {
  // take categoryid from req.params
  const { categoryId } = req.params;
  if (!categoryId) {
    throw new ApiError(400, "Category Id is required");
  }

  const isCategory = await Category.findById(categoryId);

  if (!isCategory) {
    throw new ApiError(404, "Category is not found");
  }

  const products = await Product.find({ categoryId: categoryId }).sort({
    createdAt: -1,
  });

  if (products.length === 0) {
    throw new ApiError(404, "Products for this category not available");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, products, "Products fetched by Category"));
});

const getFeaturedProducts = asyncHandler(async (req, res) => {
  const cacheKey = "products:featured:list";
  let cachedFeaturedProduct;
  try {
    cachedFeaturedProduct = await client.get(cacheKey);
  } catch (error) {
    console.error(
      "Redis unavailable, continuing without cache:",
      error.message
    );
  }
  if (cachedFeaturedProduct) {
    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          JSON.parse(cachedFeaturedProduct),
          "Products fetched from cache"
        )
      );
  }

  const featuredProducts = await Product.find({ isFeatured: true }).sort({
    createdAt: -1,
  });

  if (!featuredProducts || featuredProducts.length === 0) {
    throw new ApiError(400, "No Featured Product Found");
  }

  try {
    await client.setex(
      "product:featured",
      3600,
      JSON.stringify(featuredProducts)
    );
  } catch (error) {
    console.error("Redis cache save failed: ", error.message);
  }
  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        featuredProducts,
        "Featured Products Fetched Successfully"
      )
    );
});

const getNewArrivals = asyncHandler(async (req, res) => {
  // use redis also to save new arrivals for all
  // take 8 latest products and return there

  const cacheKey = "newArrivals:products";
  let cachedData;
  try {
    cachedData = await client.get(cacheKey);
    if (cachedData) {
      return res
        .status(200)
        .json(
          new ApiResponse(
            200,
            JSON.parse(cachedData),
            "New Arrivals Fetched from Cache"
          )
        );
    }
  } catch (error) {
    console.error("Redis Unavailable, continuing without cache", error.message);
  }

  const newProducts = await Product.find({})
    .sort({ createAt: -1 })
    .limit(8)
    .lean();

  if (!newProducts || newProducts.length === 0) {
    throw new ApiError(404, "No Products found");
  }

  try {
    await client.setex(cacheKey, 3600, JSON.stringify(newProducts));
  } catch (error) {
    console.error("Redis cache save failed:", error.message);
  }

  return res
    .status(200)
    .json(new ApiResponse(200, newProducts, "New Products Fetched"));
});

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
