import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { User } from "../models/user.model.js";
import { Seller } from "../models/seller.model.js";
import { Product } from "../models/product.model.js";

const registerStore = asyncHandler(async (req, res) => {
  const userId = req.user?._id;

  const { storeName, storeDescription, storeAddress, gstNumber, email, phone } =
    req.body;

  if (!storeName || !storeAddress || !email || !phone) {
    throw new ApiError(400, "Missing required store fields");
  }

  if (gstNumber && gstNumber.length !== 15) {
    throw new ApiError(400, "Invalid GST number format");
  }

  const existingSeller = await Seller.findOne({ sellerId: userId });

  if (existingSeller) {
    throw new ApiError(400, "You already own a store");
  }

  const duplicateChecks = await Promise.all([
    Seller.findOne({ storeName }),
    Seller.findOne({ email }),
    gstNumber ? Seller.findOne({ gstNumber }) : null,
  ]);

  if (duplicateChecks[0]) throw new ApiError(400, "Store name already exists");
  if (duplicateChecks[1]) throw new ApiError(400, "Email already exists");
  if (duplicateChecks[2]) throw new ApiError(400, "GST number already exists");

  const session = await Seller.startSession();
  session.startTransaction();

  try {
    const newSeller = await Seller.create(
      [
        {
          sellerId: userId,
          storeName,
          storeDescription,
          storeAddress,
          gstNumber,
          email,
          phone,
        },
      ],
      { session }
    );

    if (!newSeller) {
      throw new ApiError(400, "Error while creating store");
    }

    await User.findByIdAndUpdate(
      userId,
      {
        role: "seller",
        storeId: newSeller[0]._id,
      },
      { session }
    );

    await session.commitTransaction();
    session.endSession();

    return res
      .status(200)
      .json(new ApiResponse(200, newSeller[0], "Store created successfully"));
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw new ApiError(500, error.message || "Store creation failed");
  }
});

const addBankDetails = asyncHandler(async (req, res) => {
  const userId = req.user?._id;

  const { accountNumber, ifscCode, bankName, upiId } = req.body;

  if (!accountNumber || !ifscCode || !bankName) {
    throw new ApiError(400, "Account Number, IFSC, and Bank Name are required");
  }

  const accountRegex = /^[0-9]{9,18}$/;
  if (!accountRegex.test(accountNumber)) {
    throw new ApiError(400, "Invalid account number format");
  }

  const ifscRegex = /^[A-Z]{4}0[A-Z0-9]{6}$/;
  if (!ifscRegex.test(ifscCode.toUpperCase())) {
    throw new ApiError(400, "Invalid IFSC code format");
  }

  const upiRegex = /^[\w.-]{3,}@[a-zA-Z]{3,}$/;
  if (upiId && !upiRegex.test(upiId)) {
    throw new ApiError(400, "Invalid UPI ID format");
  }

  const seller = await Seller.findOne({ sellerId: userId });
  if (!seller) {
    throw new ApiError(404, "Seller not found");
  }

  seller.bankDetails = {
    accountNumber,
    bankName,
    ifscCode: ifscCode.toUpperCase(),
    upiId: upiId || "",
  };

  await seller.save();

  return res
    .status(200)
    .json(new ApiResPonse(200, {}, "Bank details saved successfully"));
});

const getStore = asyncHandler(async (req, res) => {
  const userId = req.user?._id;

  const store = await Seller.findOne({ sellerId: userId }).select(
    "-bankDetails.accountNumber -bankDetails.ifscCode"
  );
  if (!store) throw new ApiError(404, "No store found");

  return res.status(200).json(200, store, "Store fetched Successfully");
});

const getProductsSeller = asyncHandler(async (req, res) => {
  const userId = req.user?._id;

  const products = await Product.find({ sellerId: userId });

  if (!products || products.length === 0) {
    throw new ApiError(404, "No Product Found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, products, "Products Fetched Successfully"));
});

export { registerStore, addBankDetails, getStore, getProductsSeller };
