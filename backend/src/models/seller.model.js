import mongoose, { Schema } from "mongoose";
const bankDetailsSchema = new Schema(
  {
    accountNumber: { type: String, required: true },
    ifscCode: { type: String, required: true },
    bankName: { type: String, required: true },
    upiId: { type: String },
  },
  { _id: false }
);

const sellerSchema = new Schema(
  {
    sellerId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    storeName: {
      type: String,
      required: true,
    },
    storeDescription: {
      type: String,
    },
    totalProducts: {
      type: Number,
    },
    totalOrders: Number,
    bankDetails: bankDetailsSchema,
    storeLogo: { type: String },
    storeAddress: { type: String, required: true },
    status: {
      type: String,
      enum: ["active", "inactive", "banned"],
      default: "active",
    },
    gstNumber: {
      type: String,
      unique: true,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export const Seller = mongoose.model("Seller", sellerSchema);
