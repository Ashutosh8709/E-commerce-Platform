import mongoose, { Schema } from "mongoose";

const reviewSchema = new Schema(
	{
		productId: {
			type: Schema.Types.ObjectId,
			ref: "Product",
			index: true,
		},
		userId: {
			type: Schema.Types.ObjectId,
			ref: "User",
			index: true,
		},
		orderId: {
			type: Schema.Types.ObjectId,
			ref: "Order",
		},
		rating: {
			type: Number,
			min: 1,
			max: 5,
			default: 1,
		},
		title: {
			type: String,
			required: true,
		},
		comment: {
			type: String,
			required: true,
		},
		images: [{ type: String }],
	},
	{ timestamps: true }
);

export const Review = mongoose.model("Review", reviewSchema);
