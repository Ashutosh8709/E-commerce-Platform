import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Address } from "../models/address.model.js";
import { client } from "../client.js";

const getAddress = asyncHandler(async (req, res) => {
  // get userid from req.user
  // find address for this user ids and return
  const userId = req.user?._id;
  if (!userId) {
    throw new ApiError(401, "Unauthorized access");
  }

  const cacheKey = `user:${userId}:addresses`;
  let cachedAddresses;
  try {
    cachedAddresses = await client.get(cacheKey);
  } catch (err) {
    console.error("Redis unavailable, skipping cache:", err.message);
  }

  if (cachedAddresses) {
    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          JSON.parse(cachedAddresses),
          "Addresses fetched from cache",
        ),
      );
  }

  const addresses = await Address.find({ owner: userId })
    .sort({ isDefault: -1, createdAt: -1 })
    .lean();

  if (!addresses || addresses.length === 0) {
    return res.status(200).json(200, {}, "No address Found");
  }

  try {
    await client.setex(cacheKey, 3600, JSON.stringify(addresses));
  } catch (err) {
    console.error("Redis cache save failed:", err.message);
  }

  return res
    .status(200)
    .json(new ApiResponse(200, addresses, "Addresses fetched successfully"));
});

const addAddress = asyncHandler(async (req, res) => {
  const userId = req.user?._id;

  if (!userId) {
    throw new ApiError(401, "Unauthorized Access");
  }

  const {
    name,
    phone,
    street,
    city,
    state,
    country,
    postalCode,
    label,
    isDefault = false,
  } = req.body;

  if (
    !name ||
    !phone ||
    !street ||
    !city ||
    !state ||
    !country ||
    !postalCode
  ) {
    throw new ApiError(400, "All address fields are required");
  }

  const existingAddresses = await Address.countDocuments({
    owner: userId,
  });

  const makeDefault = existingAddresses === 0 || isDefault;

  const newAddress = await Address.create({
    name,
    phone,
    street,
    city,
    state,
    country,
    postalCode,
    label,
    isDefault: makeDefault,
    owner: userId,
  });

  if (makeDefault) {
    await Address.updateMany(
      { owner: userId, _id: { $ne: newAddress._id } },
      { $set: { isDefault: false } },
    );
  }

  try {
    await Promise.all([
      client.del(`user:${userId}:addresses`),
      client.del(`user:${userId}:defaultAddress`),
    ]);
  } catch (err) {
    console.error("Redis cache invalidation failed:", err.message);
  }

  return res
    .status(200)
    .json(new ApiResponse(200, newAddress, "Address added successfully"));
});

const updateAddress = asyncHandler(async (req, res) => {
  const userId = req.user?._id;
  const { addressId } = req.params;
  const updateData = req.body;

  if (!userId) {
    throw new ApiError(401, "Unauthorized Access");
  }

  if (!addressId) {
    throw new ApiError(400, "Address ID is required");
  }

  const existingAddress = await Address.findOne({
    _id: addressId,
    owner: userId,
  });
  if (!existingAddress) {
    throw new ApiError(404, "Address not found or unauthorized");
  }

  if ("isDefault" in updateData) {
    delete updateData.isDefault;
  }

  const updatedAddress = await Address.findOneAndUpdate(
    { _id: addressId, owner: userId },
    { $set: updateData },
    { new: true, runValidators: true },
  );

  try {
    await Promise.all([
      client.del(`user:${userId}:addresses`),
      client.del(`user:${userId}:defaultAddress`),
    ]);
  } catch (err) {
    console.warn("Redis cache invalidation failed:", err.message);
  }

  return res
    .status(200)
    .json(new ApiResponse(200, updatedAddress, "Address updated successfully"));
});

const removeAddress = asyncHandler(async (req, res) => {
  const userId = req.user?._id;
  const { addressId } = req.params;

  if (!userId) {
    throw new ApiError(401, "Unauthorized Access");
  }

  if (!addressId) {
    throw new ApiError(400, "Address ID is required");
  }

  const address = await Address.findOne({
    _id: addressId,
    owner: userId,
  });
  if (!address) {
    throw new ApiError(404, "Address not found or unauthorized");
  }

  await Address.deleteOne({ _id: addressId, owner: userId });

  if (address.isDefault) {
    await Address.updateOne(
      { owner: userId },
      { $set: { isDefault: true } },
      { sort: { createdAt: -1 } },
    );
  }

  try {
    await Promise.all([
      client.del(`user:${userId}:addresses`),
      client.del(`user:${userId}:defaultAddress`),
    ]);
  } catch (err) {
    console.warn("Redis cache invalidation failed:", err.message);
  }

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Address deleted successfully"));
});

const markAsDefault = asyncHandler(async (req, res) => {
  const userId = req.user?._id;
  const { addressId } = req.params;

  if (!userId) {
    throw new ApiError(401, "Unauthorized Access");
  }

  if (!addressId) {
    throw new ApiError(400, "Address ID is required");
  }

  const address = await Address.findOne({
    _id: addressId,
    owner: userId,
  });
  if (!address) {
    throw new ApiError(404, "Address not found or unauthorized");
  }

  await Address.updateMany(
    { owner: userId, isDefault: true },
    { $set: { isDefault: false } },
  );

  const updatedAddress = await Address.findByIdAndUpdate(
    addressId,
    { $set: { isDefault: true } },
    { new: true, lean: true },
  );

  try {
    await Promise.all([
      client.del(`user:${userId}:addresses`),
      client.del(`user:${userId}:defaultAddress`),
    ]);
  } catch (err) {
    console.warn("Redis cache invalidation failed:", err.message);
  }

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        updatedAddress,
        "Default address updated successfully",
      ),
    );
});

export { getAddress, addAddress, updateAddress, removeAddress, markAsDefault };
