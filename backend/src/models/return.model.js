import mongoose, { Schema } from "mongoose";

const returnSchema = new Schema(
	{
		orderId: {
			type: Schema.Types.ObjectId,
			ref: "Order",
			required: true,
		},
		userId: {
			type: Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		productId: {
			type: Schema.Types.ObjectId,
			ref: "Product",
			required: true,
		},
		reason: {
			type: String,
			required: true,
		},
		status: {
			type: String,
			enum: [
				"requested",
				"approved",
				"rejected",
				"picked-up",
				"refunded",
				"completed",
			],
			default: "requested",
		},
		requestedAt: {
			type: Date,
			default: Date.now,
		},
		processedAt: {
			type: Date,
		},
		refundId: {
			type: Schema.Types.ObjectId,
			ref: "Payment",
		},
		notes: String,
	},
	{ timestamps: true }
);
