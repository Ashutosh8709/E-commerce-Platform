import mongoose, { Schema } from "mongoose";

const paymentSchema = new Schema(
	{
		orderId: {
			type: Schema.Types.ObjectId,
			ref: "Order",
			required: true,
			index: true,
		},
		userId: {
			type: Schema.Types.ObjectId,
			ref: "User",
			required: true,
			index: true,
		},
		amount: {
			type: Number,
			required: true,
		},
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
		},
		transactionId: {
			type: String,
			required: true,
			unique: true,
		},
	},
	{ timestamps: true }
);

export const Payment = mongoose.model("Payment", paymentSchema);
