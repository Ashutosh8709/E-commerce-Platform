// src/models/payment.model.js
import mongoose, { Schema } from "mongoose";

const paymentSchema = new Schema(
	{
		orderId: {
			type: Schema.Types.ObjectId,
			ref: "Order",
			index: true,
		},
		userId: {
			type: Schema.Types.ObjectId,
			ref: "User",
			required: true,
			index: true,
		},

		// amount stored in smallest currency units? we store in normal units (INR)
		amount: {
			type: Number,
			required: true,
		},
		currency: {
			type: String,
			default: "INR",
		},

		// Razorpay fields
		razorpayOrderId: {
			type: String, // order_xxx (Razorpay)
			required: true,
			index: true,
		},
		razorpayPaymentId: {
			type: String, // pay_xxx (Razorpay)
			index: true,
		},
		razorpaySignature: {
			type: String,
		},

		// internal unique transaction id (useful before razorpayPaymentId arrives)
		transactionId: {
			type: String,
			required: true,
			unique: true,
		},

		provider: {
			type: String,
			default: "Razorpay",
		},

		// Payment status for business logic
		status: {
			type: String,
			enum: [
				"Pending",
				"Completed",
				"Failed",
				"Refunded",
				"Cancelled",
			],
			default: "Pending",
			index: true,
		},

		// refund info
		refundId: String,
		refundAmount: { type: Number, default: 0 },
		refundReason: String,
	},
	{ timestamps: true }
);

export const Payment = mongoose.model("Payment", paymentSchema);
