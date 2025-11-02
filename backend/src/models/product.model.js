import mongoose, { Schema } from "mongoose";

const dealSchema = new Schema(
  {
    type: {
      type: String,
      enum: ["flash", "seasonal", "clearance", "limited", "exclusive"],
      default: "flash",
    },
    discountPercent: {
      type: Number,
      min: 0,
      max: 100,
    },
    startDate: Date,
    endDate: Date,
    isActive: {
      type: Boolean,
      default: false,
      index: true,
    },
  },
  { _id: false }
);

const productSchema = new Schema(
  {
    sellerId: {
      type: Schema.Types.ObjectId,
      ref: "Seller",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    originalPrice: {
      type: Number,
      required: true,
    },
    offeredPrice: {
      type: Number,
      required: true,
    },
    stock: {
      type: Number,
      required: true,
      min: 0,
    },
    size: {
      type: String,
      required: true,
    },
    colors: [{ type: String }],
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    productImage: {
      type: String,
      required: true,
    },
    deal: dealSchema,
    isFeatured: {
      type: Boolean,
      default: false,
      index: true,
    },
  },
  { timestamps: true }
);

export const Product = mongoose.model("Product", productSchema);
