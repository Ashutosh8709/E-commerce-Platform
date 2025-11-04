import mongoose, { Schema } from "mongoose";

const productSchema = new Schema({
  productId: {
    type: Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  quantity: { type: Number, min: 1, default: 1, required: true },
  image: { type: String, required: true },
  name: { type: String, required: true },
  priceAtAddition: { type: Number, required: true },
  color: String,
  size: String,
});

const orderSchema = new Schema(
  {
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    products: [productSchema],

    totalAmount: { type: Number, required: true, default: 0 },
    discount: { type: Number, default: 0, min: 0 },
    finalAmount: { type: Number, min: 0 },

    addressId: {
      type: Schema.Types.ObjectId,
      ref: "Address",
      required: true,
    },
    deliveryId: { type: Schema.Types.ObjectId, ref: "Delivery" },

    paymentGatewayOrderId: { type: String, index: true },
    paymentId: { type: Schema.Types.ObjectId, ref: "Payment" },

    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed", "refunded"],
      default: "pending",
      index: true,
    },

    refundStatus: {
      type: String,
      enum: ["none", "initiated", "processing", "completed", "failed"],
      default: "none",
    },

    status: {
      type: String,
      enum: [
        "placed",
        "confirmed",
        "packed",
        "shipped",
        "outForDelivery",
        "delivered",
        "cancelled",
        "returned",
      ],
      default: "placed",
      required: true,
      index: true,
    },

    notes: String,
    gift: { type: Boolean, default: false },
  },
  { timestamps: true }
);

orderSchema.pre("save", function (next) {
  const discount = this.discount ?? 0;
  this.finalAmount = (this.totalAmount || 0) - discount;
  if (this.finalAmount < 0) this.finalAmount = 0;
  next();
});

export const Order = mongoose.model("Order", orderSchema);
