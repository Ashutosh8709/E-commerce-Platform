import { ApiError } from "../utils/ApiError.js";
import { ApiResPonse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { User } from "../models/user.model.js";
import { Seller } from "../models/seller.model.js";

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
      .status(201)
      .json(new ApiResPonse(201, newSeller[0], "Store created successfully"));
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw new ApiError(500, error.message || "Store creation failed");
  }
});

export { registerStore };
